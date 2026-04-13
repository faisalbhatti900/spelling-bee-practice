'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Check, Sparkles } from 'lucide-react';
import { LETTERS, TILE_COLORS } from '@/lib/words';
import { isLetterComplete, isLetterUnlocked, getBestScore, getStarCount } from '@/lib/storage';
import { playClick } from '@/lib/sounds';

export default function LetterGrid() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-3 px-2">
      {LETTERS.map((l, i) => {
        const complete = isLetterComplete(l);
        const unlocked = isLetterUnlocked(l);
        const best = getBestScore(l);
        const stars = getStarCount(best);

        return (
          <motion.button
            key={l}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03, type: 'spring', stiffness: 300 }}
            whileHover={unlocked ? { scale: 1.1, y: -4 } : {}}
            whileTap={unlocked ? { scale: 0.95 } : {}}
            onClick={() => {
              if (!unlocked) return;
              playClick();
              router.push(`/learn/${l}`);
            }}
            disabled={!unlocked}
            className={`
              relative aspect-square rounded-2xl flex flex-col items-center justify-center
              font-black text-2xl sm:text-3xl transition-shadow min-h-[56px]
              ${!unlocked
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-b-4 border-gray-300'
                : 'text-white shadow-lg border-b-4 cursor-pointer'
              }
            `}
            style={
              unlocked
                ? {
                    backgroundColor: TILE_COLORS[i],
                    borderBottomColor: `${TILE_COLORS[i]}cc`,
                    boxShadow: `0 4px 15px ${TILE_COLORS[i]}40`,
                  }
                : {}
            }
          >
            {!unlocked && <Lock className="w-5 h-5 text-gray-400" />}
            {unlocked && (
              <>
                <span className="drop-shadow-sm">{l}</span>
                {complete && (
                  <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-md">
                    <Check className="w-4 h-4 text-green-500" strokeWidth={3} />
                  </div>
                )}
                {stars > 0 && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] flex">
                    {Array.from({ length: Math.min(stars, 3) }).map((_, si) => (
                      <span key={si}>⭐</span>
                    ))}
                  </div>
                )}
                {!complete && <Sparkles className="absolute top-1 right-1 w-3 h-3 text-white/60" />}
              </>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
