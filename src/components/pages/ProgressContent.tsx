'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, BarChart3, BookOpen, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import { LETTERS, TILE_COLORS, LETTER_EMOJI, WORDS } from '@/lib/words';
import { getLetterData, getBestScore, getStarCount, getCompletedCount, getAllWeakWords } from '@/lib/storage';

export default function ProgressContent() {
  const router = useRouter();
  const done = getCompletedCount();
  let totalStars = 0;
  let totalPct = 0;
  let scored = 0;

  LETTERS.forEach((l) => {
    const best = getBestScore(l);
    if (best > 0) { totalPct += best; scored++; totalStars += getStarCount(best); }
  });

  const avgPct = scored ? Math.round(totalPct / scored) : 0;
  const weakWords = getAllWeakWords().slice(0, 15);

  let motivational = '';
  if (avgPct >= 90) motivational = "You're absolutely incredible! A true word master! 🏆";
  else if (avgPct >= 70) motivational = "You're doing great! Keep up the amazing work! 🌟";
  else if (avgPct >= 50) motivational = "Good progress! Practice makes perfect! 💪";
  else if (scored > 0) motivational = "You've started your journey! Keep going! 🐝";
  else motivational = "Tap a letter on the home screen to begin your adventure! 🚀";

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.push('/home')} className="flex items-center gap-1 text-gray-500 font-bold hover:text-gray-700 cursor-pointer">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <h1 className="text-xl font-extrabold flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#1CB0F6]" /> My Progress
          </h1>
          <div className="w-16" />
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { val: `${done}`, label: 'Letters Done', icon: BookOpen, color: '#CE82FF' },
            { val: `${avgPct}%`, label: 'Avg Score', icon: Award, color: '#58CC02' },
            { val: `${totalStars}`, label: 'Total Stars', icon: () => <span className="text-xl">⭐</span>, color: '#FFC800' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-md text-center">
              <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: stat.color + '20' }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.val}</div>
              <div className="text-xs font-bold text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-extrabold text-gray-600">Letter Progress</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {LETTERS.map((l, i) => {
              const best = getBestScore(l);
              const stars = getStarCount(best);
              const d = getLetterData(l);
              const scores = d.scores || [];
              let trend: 'up' | 'down' | 'same' | null = null;
              if (scores.length >= 2) {
                const last = scores[scores.length - 1].pct;
                const prev = scores[scores.length - 2].pct;
                trend = last > prev ? 'up' : last < prev ? 'down' : 'same';
              }
              return (
                <motion.div key={l} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm" style={{ backgroundColor: TILE_COLORS[i] }}>{l}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{LETTER_EMOJI[i]}</span>
                      <span className="font-bold text-xs text-gray-600">{WORDS[l].length} words</span>
                    </div>
                    <div className="mt-1"><ProgressBar value={best} height={6} showGlow={false} /></div>
                  </div>
                  <div className="font-extrabold text-sm text-gray-500 w-10 text-right">{best ? `${best}%` : '—'}</div>
                  <div className="text-xs w-12 text-right">
                    {Array.from({ length: Math.min(stars, 3) }).map((_, si) => <span key={si}>⭐</span>)}
                  </div>
                  <div className="w-5">
                    {trend === 'up' && <TrendingUp className="w-4 h-4 text-[#58CC02]" />}
                    {trend === 'down' && <TrendingDown className="w-4 h-4 text-[#FF4B4B]" />}
                    {trend === 'same' && <Minus className="w-4 h-4 text-gray-300" />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {weakWords.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-md p-4 mb-6">
            <h3 className="font-extrabold text-gray-600 mb-3">Words to Practise More 📝</h3>
            <div className="flex flex-wrap gap-2">
              {weakWords.map((w) => (
                <span key={w.word + w.letter} className="px-3 py-1.5 rounded-xl bg-[#FFE8E8] text-[#d83b3b] font-bold text-sm">
                  {w.word}<span className="text-xs opacity-60 ml-1">({w.count}x)</span>
                </span>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-center p-5 rounded-2xl font-bold text-[#CE82FF]" style={{ background: 'linear-gradient(135deg, #F0E6FF, #E6F9FF)' }}>
          {motivational}
        </motion.div>
      </div>
    </div>
  );
}
