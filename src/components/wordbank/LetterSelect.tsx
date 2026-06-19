'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Check, Lock, Trophy, BarChart3, Settings as SettingsIcon } from 'lucide-react';
import { LETTERS, TILE_COLORS } from '@/lib/words';
import { countWords, getCategoryColor } from '@/lib/wordBank';
import { isLetterComplete, isLetterUnlockedSeq } from '@/lib/wordBankStorage';
import { allLettersComplete, getFinalResult } from '@/lib/examStorage';
import { playClick } from '@/lib/sounds';

interface LetterSelectProps {
  category: string;
  onPick: (letter: string) => void;
  onBack: () => void;
  onProgress: () => void;
  onSettings: () => void;
  onFinalExam: () => void;
}

export default function LetterSelect({ category, onPick, onBack, onProgress, onSettings, onFinalExam }: LetterSelectProps) {
  const finalUnlocked = allLettersComplete(category);
  const finalBest = getFinalResult(category);
  const finalPct = finalBest && finalBest.total > 0 ? Math.round((finalBest.score / finalBest.total) * 100) : 0;

  return (
    <div className="relative z-10 max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => { playClick(); onBack(); }}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-md font-extrabold text-gray-600 hover:text-gray-800 transition-colors cursor-pointer min-h-[44px]"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { playClick(); onProgress(); }}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-md font-extrabold text-gray-600 hover:text-gray-800 transition-colors cursor-pointer min-h-[44px]"
          >
            <BarChart3 className="w-5 h-5 text-[#1CB0F6]" /> Progress
          </button>
          <button
            onClick={() => { playClick(); onSettings(); }}
            className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            aria-label="Settings"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black" style={{ color: getCategoryColor(category) }}>
          {category}
        </h2>
        <p className="text-gray-400 font-bold mt-1">Finish each letter to unlock the next!</p>
      </motion.div>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-3 px-2">
        {LETTERS.map((l, i) => {
          const hasWords = countWords(category, l) > 0;
          const unlocked = hasWords && isLetterUnlockedSeq(category, l);
          const complete = isLetterComplete(category, l);
          const locked = !unlocked;

          return (
            <motion.button
              key={l}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02, type: 'spring', stiffness: 300 }}
              whileHover={unlocked ? { scale: 1.1, y: -4 } : {}}
              whileTap={unlocked ? { scale: 0.95 } : {}}
              onClick={() => { if (unlocked) { playClick(); onPick(l); } }}
              disabled={locked}
              className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center font-black text-2xl sm:text-3xl transition-shadow min-h-[56px]
                ${locked
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-b-4 border-gray-300'
                  : 'text-white shadow-lg border-b-4 cursor-pointer'}`}
              style={
                unlocked
                  ? {
                      backgroundColor: complete ? '#58CC02' : TILE_COLORS[i],
                      borderBottomColor: complete ? '#46a302' : `${TILE_COLORS[i]}cc`,
                      boxShadow: `0 4px 15px ${(complete ? '#58CC02' : TILE_COLORS[i])}40`,
                    }
                  : {}
              }
            >
              {locked ? (
                <Lock className="w-5 h-5 text-gray-400" />
              ) : (
                <span className="drop-shadow-sm">{l}</span>
              )}
              {unlocked && (
                <span className="text-[10px] font-bold leading-none mt-0.5 text-white/90">{countWords(category, l)}</span>
              )}
              {complete && (
                <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-md">
                  <Check className="w-4 h-4 text-green-500" strokeWidth={3} />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* ===== EXAMS FEATURE — Final Exam button ===== */}
      <div className="mt-8 px-2">
        <motion.button
          whileHover={finalUnlocked ? { scale: 1.02 } : {}}
          whileTap={finalUnlocked ? { scale: 0.98 } : {}}
          onClick={() => { if (finalUnlocked) { playClick(); onFinalExam(); } }}
          disabled={!finalUnlocked}
          className={`btn-chunky w-full flex items-center justify-center gap-3 px-6 py-5 rounded-3xl font-black text-lg shadow-lg cursor-pointer disabled:cursor-not-allowed
            ${finalUnlocked
              ? 'bg-[#FFC800] text-[#7a5c00] border-b-4 border-[#d9a800] exam-gold-pulse'
              : 'bg-gray-200 text-gray-400 border-b-4 border-gray-300'}`}
        >
          {finalUnlocked
            ? <><Trophy className="w-6 h-6" /> Final Exam — Are you ready?</>
            : <><Lock className="w-5 h-5" /> Complete all letters to unlock Final Exam</>}
        </motion.button>
        {finalBest && (
          <p className="text-center text-sm font-bold text-gray-500 mt-2">
            Best score: {finalBest.score} / {finalBest.total} — {finalPct}%
          </p>
        )}
      </div>
    </div>
  );
}
