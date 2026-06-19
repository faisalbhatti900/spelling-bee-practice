'use client';

import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { getCategoryColor } from '@/lib/wordBank';
import { isLevelUnlocked, getLevelStars } from '@/lib/wordBankStorage';
import { playClick } from '@/lib/sounds';
import { LEVEL_META, type LevelNum } from './types';
import StarRating from './StarRating';

interface LevelSelectProps {
  category: string;
  letter: string;
  onPick: (level: LevelNum) => void;
  onBack: () => void;
}

export default function LevelSelect({ category, letter, onPick, onBack }: LevelSelectProps) {
  const levels: LevelNum[] = [1, 2, 3];

  return (
    <div className="relative z-10 max-w-xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <BackButton onClick={onBack} />
        <h1 className="text-2xl font-black" style={{ color: getCategoryColor(category) }}>
          {category} — Letter {letter}
        </h1>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-black text-center text-[#CE82FF] mb-6"
      >
        Choose a Level!
      </motion.h2>

      <div className="flex flex-col gap-4">
        {levels.map((level, i) => {
          const meta = LEVEL_META[level];
          const unlocked = isLevelUnlocked(category, letter);
          const stars = getLevelStars(category, letter, level);

          return (
            <motion.button
              key={level}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.12 }}
              whileHover={unlocked ? { scale: 1.02 } : {}}
              whileTap={unlocked ? { scale: 0.98 } : {}}
              onClick={() => { if (unlocked) { playClick(); onPick(level); } }}
              disabled={!unlocked}
              className="btn-chunky relative flex items-center gap-4 p-5 text-left rounded-3xl shadow-lg cursor-pointer disabled:cursor-not-allowed"
              style={
                unlocked
                  ? { backgroundColor: meta.color, borderBottom: `4px solid ${meta.darker}`, color: '#fff' }
                  : { backgroundColor: '#e5e7eb', borderBottom: '4px solid #d1d5db', color: '#9ca3af' }
              }
            >
              <span className="text-4xl shrink-0">{unlocked ? meta.emoji : '🔒'}</span>
              <span className="flex-1 min-w-0">
                <span className="block text-xs font-black uppercase tracking-wide opacity-80">Level {level}</span>
                <span className="block text-xl font-black">{meta.name}</span>
                <span className="block text-sm font-semibold opacity-90">{meta.desc}</span>
                {unlocked && stars > 0 && (
                  <span className="mt-1 inline-flex">
                    <StarRating value={stars} size={18} />
                  </span>
                )}
              </span>
              {!unlocked && (
                <span className="flex flex-col items-center gap-1 text-xs font-bold shrink-0">
                  <Lock className="w-5 h-5" />
                  Locked
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      <p className="text-center text-gray-400 font-bold text-sm mt-6">
        Play the levels in any order you like!
      </p>
    </div>
  );
}
