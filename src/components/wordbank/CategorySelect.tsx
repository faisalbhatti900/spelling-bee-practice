'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BarChart3, BookText } from 'lucide-react';
import {
  getCategories,
  getCategoryColor,
  getCategoryEmoji,
  countLettersWithWords,
  countTotalWords,
} from '@/lib/wordBank';
import { playClick } from '@/lib/sounds';

interface CategorySelectProps {
  onPick: (category: string) => void;
  onBack: () => void;
  onProgress: () => void;
}

export default function CategorySelect({ onPick, onBack, onProgress }: CategorySelectProps) {
  const categories = getCategories();

  return (
    <div className="relative z-10 max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { playClick(); onBack(); }}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-md font-extrabold text-gray-600 hover:text-gray-800 transition-colors cursor-pointer min-h-[44px]"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { playClick(); onProgress(); }}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-md font-extrabold text-gray-600 hover:text-gray-800 transition-colors cursor-pointer min-h-[44px]"
        >
          <BarChart3 className="w-5 h-5 text-[#1CB0F6]" /> My Progress
        </motion.button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="text-6xl mb-2">📚</div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#1CB0F6]">Word Bank</h1>
        <p className="text-gray-500 font-bold mt-2 text-lg">Pick your category to start!</p>
      </motion.div>

      <div className="flex flex-col gap-5">
        {categories.map((category, i) => {
          const color = getCategoryColor(category);
          const letters = countLettersWithWords(category);
          const total = countTotalWords(category);
          const empty = total === 0;

          return (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12 }}
              whileHover={empty ? {} : { scale: 1.02 }}
              whileTap={empty ? {} : { scale: 0.98 }}
              onClick={() => { if (!empty) { playClick(); onPick(category); } }}
              disabled={empty}
              className="btn-chunky relative flex items-center gap-4 p-5 text-white text-left rounded-3xl shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              style={{ backgroundColor: color, borderBottom: `4px solid ${color}cc` }}
            >
              <span className="text-5xl shrink-0">{getCategoryEmoji(category)}</span>
              <span className="flex-1 min-w-0">
                <span className="block text-2xl font-black">{category}</span>
                <span className="mt-1 flex items-center gap-3 text-sm font-bold text-white/90">
                  <span className="flex items-center gap-1">
                    <BookText className="w-4 h-4" /> {letters} letters
                  </span>
                  <span>{total} words</span>
                </span>
                {empty && <span className="block text-xs font-bold text-white/80 mt-1">No words added yet</span>}
              </span>
              {!empty && <ArrowRight className="w-6 h-6 shrink-0" />}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
