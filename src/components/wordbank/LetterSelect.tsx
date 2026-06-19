'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Check, Star, Pencil, Lock, Trophy } from 'lucide-react';
import { LETTERS, TILE_COLORS } from '@/lib/words';
import { countWords, getCategoryColor } from '@/lib/wordBank';
import { isLetterComplete } from '@/lib/wordBankStorage';
import { allLettersComplete, getFinalResult, isExamTaken } from '@/lib/examStorage';
import { playClick } from '@/lib/sounds';

interface LetterSelectProps {
  category: string;
  onPick: (letter: string) => void;
  onBack: () => void;
  onFinalExam: () => void;
}

export default function LetterSelect({ category, onPick, onBack, onFinalExam }: LetterSelectProps) {
  const finalUnlocked = allLettersComplete(category);
  const finalBest = getFinalResult(category);
  const finalPct = finalBest && finalBest.total > 0 ? Math.round((finalBest.score / finalBest.total) * 100) : 0;

  return (
    <div className="relative z-10 max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { playClick(); onBack(); }}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-md font-extrabold text-gray-600 hover:text-gray-800 transition-colors cursor-pointer min-h-[44px]"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </motion.button>
        <h1 className="text-2xl font-black" style={{ color: getCategoryColor(category) }}>
          {category}
        </h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-[#CE82FF]">Pick a Letter!</h2>
        <p className="text-gray-400 font-bold mt-1">Tap a letter that has words</p>
      </motion.div>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-3 px-2">
        {LETTERS.map((l, i) => {
          const count = countWords(category, l);
          const hasWords = count > 0;
          const complete = isLetterComplete(category, l);
          const examDone = complete && isExamTaken(category, l);

          return (
            <motion.button
              key={l}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02, type: 'spring', stiffness: 300 }}
              whileHover={hasWords ? { scale: 1.1, y: -4 } : {}}
              whileTap={hasWords ? { scale: 0.95 } : {}}
              onClick={() => { if (hasWords) { playClick(); onPick(l); } }}
              disabled={!hasWords}
              className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center font-black text-2xl sm:text-3xl transition-shadow min-h-[56px]
                ${!hasWords
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-b-4 border-gray-300'
                  : 'text-white shadow-lg border-b-4 cursor-pointer'}`}
              style={
                hasWords
                  ? {
                      backgroundColor: complete ? '#58CC02' : TILE_COLORS[i],
                      borderBottomColor: complete ? '#46a302' : `${TILE_COLORS[i]}cc`,
                      boxShadow: `0 4px 15px ${(complete ? '#58CC02' : TILE_COLORS[i])}40`,
                    }
                  : {}
              }
            >
              <span className="drop-shadow-sm">{l}</span>
              {hasWords && (
                <span className="text-[10px] font-bold leading-none mt-0.5 text-white/90">{count}</span>
              )}
              {complete && (
                <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-md">
                  <Check className="w-4 h-4 text-green-500" strokeWidth={3} />
                </div>
              )}
              {/* EXAMS FEATURE — exam badge: star if exam taken, pencil if ready to take */}
              {complete && (
                <div className="absolute -bottom-1 -left-1 bg-white rounded-full p-0.5 shadow-md">
                  {examDone
                    ? <Star className="w-4 h-4 text-[#FFC800]" fill="#FFC800" strokeWidth={1.5} />
                    : <Pencil className="w-3.5 h-3.5 text-[#CE82FF]" strokeWidth={2.5} />}
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
