'use client';

// ===== EXAMS FEATURE — letter exam result =====

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, RotateCcw, Grid3x3 } from 'lucide-react';
import { playWin, playClick } from '@/lib/sounds';
import type { ExamAnswer } from '@/lib/examStorage';
import { ENCOURAGE } from './types';
import StarRating from './StarRating';
import Confetti from './Confetti';

interface ExamResultProps {
  category: string;
  letter: string;
  answers: ExamAnswer[];
  stars: number;
  onRetry: () => void;
  onBack: () => void;
}

export default function ExamResult({ category, letter, answers, stars, onRetry, onBack }: ExamResultProps) {
  const total = answers.length;
  const score = answers.filter((a) => a.correct).length;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  useEffect(() => {
    if (stars >= 5) playWin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative z-10 max-w-lg mx-auto px-4 py-8">
      {stars >= 5 && <Confetti />}

      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
        <div className="text-5xl mb-1">📝</div>
        <h1 className="text-2xl font-black text-gray-700">Letter {letter} Exam Complete!</h1>
        <p className="text-gray-400 font-bold">{category}</p>

        <div className="my-5"><StarRating value={stars} size={44} animate /></div>

        <div className="text-4xl font-black text-[#58CC02]">{score} / {total}</div>
        <div className="text-xl font-black text-gray-500">{pct}%</div>

        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="mt-3 text-lg font-black text-[#CE82FF]"
        >
          {ENCOURAGE[stars] ?? ENCOURAGE[1]}
        </motion.p>
      </motion.div>

      <div className="mt-6 bg-white rounded-2xl shadow-md p-3 max-h-64 overflow-y-auto">
        {answers.map((a, i) => (
          <div
            key={`${a.word}-${i}`}
            className={`flex items-center justify-between rounded-xl px-3 py-2 mb-1 font-bold
              ${a.correct ? 'bg-green-50 text-[#46a302]' : 'bg-red-50 text-[#d83b3b]'}`}
          >
            <span className="flex items-center gap-2">
              {a.correct ? <Check className="w-5 h-5" strokeWidth={3} /> : <X className="w-5 h-5" strokeWidth={3} />}
              {a.word}
            </span>
            {!a.correct && <span className="text-sm font-black">✓ {a.word}</span>}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={() => { playClick(); onRetry(); }}
          className="btn-chunky flex items-center justify-center gap-2 px-6 py-4 bg-[#FF9600] text-white font-extrabold text-lg border-b-4 border-[#cc7800] rounded-2xl shadow-md cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" /> Retry exam
        </button>
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
