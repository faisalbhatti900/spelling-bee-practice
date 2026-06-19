'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Star, Target, AlertCircle } from 'lucide-react';
import { getCategories, getCategoryColor, getLettersWithCount } from '@/lib/wordBank';
import { getLevelStars, getLevelProgress, getCategoryStats, getHardWords, type LevelNum } from '@/lib/wordBankStorage';
import { playClick } from '@/lib/sounds';
import StarRating from './StarRating';
import { formatTime } from './types';

interface WordBankProgressProps {
  onBack: () => void;
}

export default function WordBankProgress({ onBack }: WordBankProgressProps) {
  const categories = getCategories();
  const [active, setActive] = useState(categories[0]);

  const color = getCategoryColor(active);
  const lettersWithWords = getLettersWithCount(active).filter((l) => l.count > 0);
  const letterNames = getLettersWithCount(active).map((l) => l.letter);
  const stats = getCategoryStats(active, letterNames);
  const hardWords = getHardWords(active);

  return (
    <div className="relative z-10 max-w-2xl mx-auto px-4 py-6">
      <button
        onClick={() => { playClick(); onBack(); }}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-md font-extrabold text-gray-600 hover:text-gray-800 transition-colors cursor-pointer min-h-[44px] mb-5"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h1 className="text-3xl font-black text-center text-[#1CB0F6] mb-5">📊 My Progress</h1>

      {/* Category tabs */}
      <div className="flex gap-2 mb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { playClick(); setActive(cat); }}
            className="flex-1 py-3 rounded-2xl font-black transition cursor-pointer min-h-[44px]"
            style={
              active === cat
                ? { backgroundColor: getCategoryColor(cat), color: '#fff', borderBottom: `4px solid ${getCategoryColor(cat)}cc` }
                : { backgroundColor: '#fff', color: '#9ca3af', border: '2px solid #e5e7eb' }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Totals */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Stat icon={<Trophy className="w-5 h-5 text-[#58CC02]" />} value={stats.lettersCompleted} label="Letters done" />
        <Stat icon={<Star className="w-5 h-5 text-[#FFC800]" />} value={stats.totalStars} label="Total stars" />
        <Stat icon={<Target className="w-5 h-5 text-[#1CB0F6]" />} value={`${stats.avgScore}%`} label="Avg score" />
      </div>

      {/* Per-letter level breakdown */}
      {lettersWithWords.length === 0 ? (
        <p className="text-center text-gray-400 font-bold py-8">No words added to {active} yet.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-md p-3 mb-6">
          {lettersWithWords.map(({ letter }) => (
            <div key={letter} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shrink-0"
                style={{ backgroundColor: color }}
              >
                {letter}
              </div>
              <div className="flex-1 grid grid-cols-3 gap-2">
                {([1, 2, 3] as LevelNum[]).map((lvl) => {
                  const stars = getLevelStars(active, letter, lvl);
                  const prog = getLevelProgress(active, letter, lvl);
                  return (
                    <div key={lvl} className="text-center">
                      <div className="text-[10px] font-black text-gray-400">L{lvl}</div>
                      {stars > 0 ? (
                        <>
                          <StarRating value={stars} max={3} size={12} />
                          <div className="text-[9px] font-bold text-[#1CB0F6] tabular-nums">⏱ {formatTime(prog?.timeMs ?? 0)}</div>
                        </>
                      ) : (
                        <div className="text-gray-300 text-xs font-bold">—</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Words I find hard */}
      {hardWords.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-md p-4">
          <h2 className="flex items-center gap-2 font-black text-[#FF4B4B] mb-3">
            <AlertCircle className="w-5 h-5" /> Words I find hard
          </h2>
          <div className="flex flex-wrap gap-2">
            {hardWords.map((w) => (
              <span key={w.word} className="px-3 py-1.5 rounded-xl bg-red-50 text-[#d83b3b] font-bold text-sm">
                {w.word} <span className="text-xs opacity-70">×{w.count}</span>
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-3 text-center">
      <div className="flex justify-center mb-1">{icon}</div>
      <div className="text-2xl font-black text-gray-700">{value}</div>
      <div className="text-[11px] font-bold text-gray-400">{label}</div>
    </div>
  );
}
