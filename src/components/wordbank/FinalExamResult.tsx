'use client';

// ===== EXAMS FEATURE — final exam result =====

import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Target, Grid3x3 } from 'lucide-react';
import { LETTERS } from '@/lib/words';
import { playWin, playClick } from '@/lib/sounds';
import type { ExamAnswer } from '@/lib/examStorage';
import { ENCOURAGE } from './types';
import StarRating from './StarRating';
import Confetti from './Confetti';

interface FinalExamResultProps {
  category: string;
  answers: ExamAnswer[];
  stars: number;
  onRetryFull: () => void;
  onRetryWeak: (weakLetters: string[]) => void;
  onBack: () => void;
}

export default function FinalExamResult({
  category, answers, stars, onRetryFull, onRetryWeak, onBack,
}: FinalExamResultProps) {
  const total = answers.length;
  const score = answers.filter((a) => a.correct).length;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  const perLetter = useMemo(() => {
    const map: Record<string, { score: number; total: number }> = {};
    answers.forEach((a) => {
      if (!map[a.letter]) map[a.letter] = { score: 0, total: 0 };
      map[a.letter].total += 1;
      if (a.correct) map[a.letter].score += 1;
    });
    return LETTERS.filter((l) => map[l]).map((l) => ({
      letter: l,
      ...map[l],
      pct: Math.round((map[l].score / map[l].total) * 100),
    }));
  }, [answers]);

  const weakLetters = perLetter.filter((l) => l.pct < 70).map((l) => l.letter);

  useEffect(() => {
    playWin();
  }, []);

  return (
    <div className="relative z-10 max-w-lg mx-auto px-4 py-8">
      <Confetti count={90} />

      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
        <div className="text-7xl mb-2 exam-trophy">🏆</div>
        <h1 className="text-3xl font-black text-[#FF9600]">Final Exam Complete!</h1>
        <p className="text-gray-400 font-bold">{category}</p>

        <div className="my-5"><StarRating value={stars} size={48} animate /></div>

        <div className="text-5xl font-black text-[#58CC02]">{score} / {total}</div>
        <div className="text-2xl font-black text-gray-500">{pct}%</div>
        <p className="mt-3 text-lg font-black text-[#CE82FF]">{ENCOURAGE[stars] ?? ENCOURAGE[1]}</p>
      </motion.div>

      {/* Per-letter breakdown */}
      <div className="mt-6 bg-white rounded-2xl shadow-md p-4">
        <h2 className="font-black text-gray-600 mb-3">Score by letter</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {perLetter.map((l) => (
            <div
              key={l.letter}
              className={`flex items-center justify-between rounded-xl px-3 py-2 font-bold text-sm
                ${l.pct < 70 ? 'bg-red-50 text-[#d83b3b]' : 'bg-green-50 text-[#46a302]'}`}
            >
              <span className="font-black">{l.letter}</span>
              <span>{l.score}/{l.total}</span>
            </div>
          ))}
        </div>
      </div>

      {weakLetters.length > 0 && (
        <div className="mt-4 bg-white rounded-2xl shadow-md p-4">
          <h2 className="flex items-center gap-2 font-black text-[#FF4B4B] mb-2">
            <Target className="w-5 h-5" /> Weak letters (under 70%)
          </h2>
          <div className="flex flex-wrap gap-2">
            {weakLetters.map((l) => (
              <span key={l} className="px-3 py-1.5 rounded-xl bg-red-50 text-[#d83b3b] font-black text-sm">{l}</span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={() => { playClick(); onRetryFull(); }}
          className="btn-chunky flex items-center justify-center gap-2 px-6 py-4 bg-[#FF9600] text-white font-extrabold text-lg border-b-4 border-[#cc7800] rounded-2xl shadow-md cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" /> Retry full exam
        </button>
        {weakLetters.length > 0 && (
          <button
            onClick={() => { playClick(); onRetryWeak(weakLetters); }}
            className="btn-chunky flex items-center justify-center gap-2 px-6 py-4 bg-[#CE82FF] text-white font-extrabold text-lg border-b-4 border-[#a55ecc] rounded-2xl shadow-md cursor-pointer"
          >
            <Target className="w-5 h-5" /> Retry weak letters only
          </button>
        )}
        <button
          onClick={() => { playClick(); onBack(); }}
          className="btn-chunky flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-700 font-extrabold border-2 border-gray-200 border-b-4 border-b-gray-300 rounded-2xl shadow-md cursor-pointer"
        >
          <Grid3x3 className="w-5 h-5 text-[#1CB0F6]" /> Back to letters
        </button>
      </div>
    </div>
  );
}
