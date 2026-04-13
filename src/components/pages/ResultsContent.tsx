'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Home, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { LETTERS } from '@/lib/words';
import { getStarCount } from '@/lib/storage';
import { playWin, playLose } from '@/lib/sounds';
import confetti from 'canvas-confetti';
import { QuizResult } from '@/lib/storage';

const GRADE_MSGS: Record<number, string> = {
  5: "PERFECT! You're a Word Wizard! 🧙‍♂️",
  4: "Awesome job! Almost perfect! 🌟",
  3: "Great work! Keep practising! 💪",
  2: "Good effort! Try again to improve! 🌈",
  1: "Keep going! You'll do better next time! 🐝",
};

export default function ResultsContent() {
  const router = useRouter();
  const params = useParams();
  const letter = (params.letter as string).toUpperCase();

  const [data, setData] = useState<{ score: number; total: number; results: QuizResult[] } | null>(null);
  const [soundPlayed, setSoundPlayed] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(`quiz-results-${letter}`);
      if (raw) {
        setData(JSON.parse(raw));
        sessionStorage.removeItem(`quiz-results-${letter}`);
      } else {
        router.push('/home');
      }
    } catch {
      router.push('/home');
    }
  }, [letter, router]);

  useEffect(() => {
    if (!data || soundPlayed) return;
    setSoundPlayed(true);
    const pct = Math.round((data.score / data.total) * 100);
    const stars = getStarCount(pct);
    if (stars >= 4) {
      playWin();
      const end = Date.now() + 2000;
      const colors = ['#CE82FF', '#1CB0F6', '#FF9600', '#58CC02', '#FF4B4B', '#FFC800', '#FF86D0'];
      (function frame() {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    } else {
      playLose();
    }
  }, [data, soundPlayed]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🐝</div>
          <div className="w-12 h-12 border-4 border-[#CE82FF] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  const pct = Math.round((data.score / data.total) * 100);
  const stars = getStarCount(pct);
  const wrongWords = [...new Set(data.results.filter((r) => !r.correct).map((r) => r.word))];
  const nextIdx = LETTERS.indexOf(letter) + 1;

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <motion.div key={s} initial={{ scale: 0, rotate: -20 }}
              animate={s <= stars ? { scale: 1, rotate: 0 } : { scale: 1, rotate: 0, opacity: 0.2 }}
              transition={{ delay: s * 0.2, type: 'spring', stiffness: 300 }} className="text-5xl">
              ⭐
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} className="text-center mb-6">
          <div className="text-6xl sm:text-7xl font-black text-[#CE82FF]">{data.score} / {data.total}</div>
          <div className="text-2xl font-extrabold text-gray-400 mt-1">{pct}%</div>
          <div className="text-xl font-extrabold text-[#FF9600] mt-2">{GRADE_MSGS[stars] || GRADE_MSGS[1]}</div>
        </motion.div>

        <div className="mb-6">
          <h3 className="font-extrabold text-gray-500 text-sm mb-3">Word Review</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {data.results.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.04 }}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm ${r.correct ? 'bg-[#E8F9E0] text-[#46a302]' : 'bg-[#FFE8E8] text-[#d83b3b]'}`}>
                {r.correct ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {r.word}
                <span className="text-xs opacity-60">({r.type})</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="flex flex-col gap-3">
          {wrongWords.length > 0 && (
            <button onClick={() => router.push(`/learn/${letter}`)}
              className="btn-chunky w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#FF9600] text-white font-extrabold text-lg border-b-4 border-[#cc7800] rounded-2xl cursor-pointer">
              <RotateCcw className="w-5 h-5" /> Retry Weak Words
            </button>
          )}
          {nextIdx < 26 && (
            <button onClick={() => router.push(`/learn/${LETTERS[nextIdx]}`)}
              className="btn-chunky w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#58CC02] text-white font-extrabold text-lg border-b-4 border-[#46a302] rounded-2xl shadow-lg cursor-pointer">
              Next Letter: {LETTERS[nextIdx]} <ArrowRight className="w-5 h-5" />
            </button>
          )}
          <button onClick={() => router.push('/home')}
            className="btn-chunky w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-600 font-extrabold text-lg border-2 border-gray-200 border-b-4 border-b-gray-300 rounded-2xl cursor-pointer">
            <Home className="w-5 h-5" /> Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
