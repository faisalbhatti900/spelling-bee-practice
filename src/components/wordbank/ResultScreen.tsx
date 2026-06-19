'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, RotateCcw, ArrowRight, Grid3x3, Clock, Zap } from 'lucide-react';
import { playWin, playClick } from '@/lib/sounds';
import { isLetterComplete } from '@/lib/wordBankStorage';
import { LEVEL_META, ENCOURAGE, formatTime, type LevelNum, type PlayResult } from './types';
import StarRating from './StarRating';
import Confetti from './Confetti';

interface ResultScreenProps {
  category: string;
  letter: string;
  level: LevelNum;
  result: PlayResult;
  stars: number;
  isRetry: boolean;
  nextLevel: LevelNum | null;
  onRetryWrong: (words: string[]) => void;
  onNextLevel: () => void;
  onBackToLetters: () => void;
  onLetterExam: () => void;
}

export default function ResultScreen({
  category, letter, level, result, stars, isRetry, nextLevel,
  onRetryWrong, onNextLevel, onBackToLetters, onLetterExam,
}: ResultScreenProps) {
  const pct = result.total > 0 ? Math.round((result.score / result.total) * 100) : 0;
  const wrongWords = Array.from(new Set(result.results.filter((r) => !r.correct).map((r) => r.word)));
  const secPerWord = result.total > 0 ? (result.timeMs / 1000 / result.total).toFixed(1) : '0';
  const letterDone = !isRetry && isLetterComplete(category, letter);

  useEffect(() => {
    if (stars >= 5) playWin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative z-10 max-w-lg mx-auto px-4 py-8">
      {stars >= 5 && <Confetti />}

      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
        <h1 className="text-2xl font-black text-gray-700">
          Letter {letter} — Level {level} {isRetry ? 'Practice!' : 'Complete!'}
        </h1>
        <p className="text-gray-400 font-bold">{LEVEL_META[level].name}</p>

        <div className="my-5">
          <StarRating value={stars} size={44} animate />
        </div>

        <div className="text-4xl font-black text-[#58CC02]">
          {result.score} / {result.total}
        </div>
        <div className="text-xl font-black text-gray-500">{pct}%</div>

        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white shadow-sm font-black text-[#1CB0F6] tabular-nums">
            <Clock className="w-4 h-4" /> {formatTime(result.timeMs)}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white shadow-sm font-black text-[#FF9600] tabular-nums">
            <Zap className="w-4 h-4" /> {secPerWord}s / word
          </span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-3 text-lg font-black text-[#CE82FF]"
        >
          {ENCOURAGE[stars] ?? ENCOURAGE[1]}
        </motion.p>
      </motion.div>

      {/* Word review */}
      <div className="mt-6 bg-white rounded-2xl shadow-md p-3 max-h-64 overflow-y-auto">
        {result.results.map((r, i) => (
          <div
            key={`${r.word}-${i}`}
            className={`flex items-center justify-between rounded-xl px-3 py-2 mb-1 font-bold
              ${r.correct ? 'bg-green-50 text-[#46a302]' : 'bg-red-50 text-[#d83b3b]'}`}
          >
            <span className="flex items-center gap-2">
              {r.correct ? <Check className="w-5 h-5" strokeWidth={3} /> : <X className="w-5 h-5" strokeWidth={3} />}
              {r.word}
            </span>
            {!r.correct && <span className="text-sm font-black">✓ {r.word}</span>}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-6">
        {wrongWords.length > 0 && (
          <button
            onClick={() => { playClick(); onRetryWrong(wrongWords); }}
            className="btn-chunky flex items-center justify-center gap-2 px-6 py-4 bg-[#FF9600] text-white font-extrabold text-lg border-b-4 border-[#cc7800] rounded-2xl shadow-md cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" /> Retry wrong words ({wrongWords.length})
          </button>
        )}

        {nextLevel && !isRetry ? (
          <button
            onClick={() => { playClick(); onNextLevel(); }}
            className="btn-chunky flex items-center justify-center gap-2 px-6 py-4 bg-[#58CC02] text-white font-extrabold text-lg border-b-4 border-[#46a302] rounded-2xl shadow-md cursor-pointer"
          >
            Next Level <ArrowRight className="w-5 h-5" />
          </button>
        ) : null}

        {letterDone && (
          <button
            onClick={() => { playClick(); onLetterExam(); }}
            className="btn-chunky flex items-center justify-center gap-2 px-6 py-4 bg-[#CE82FF] text-white font-extrabold text-lg border-b-4 border-[#a55ecc] rounded-2xl shadow-md cursor-pointer"
          >
            📝 Letter {letter} Exam
          </button>
        )}

        <button
          onClick={() => { playClick(); onBackToLetters(); }}
          className="btn-chunky flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-700 font-extrabold border-2 border-gray-200 border-b-4 border-b-gray-300 rounded-2xl shadow-md cursor-pointer"
        >
          <Grid3x3 className="w-5 h-5 text-[#1CB0F6]" /> Back to letters
        </button>
      </div>
    </div>
  );
}
