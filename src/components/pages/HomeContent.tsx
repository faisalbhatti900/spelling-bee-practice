'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Settings, Trophy, BarChart3, Sparkles } from 'lucide-react';
import LetterGrid from '@/components/LetterGrid';
import ProgressBar from '@/components/ProgressBar';
import FloatingParticles from '@/components/FloatingParticles';
import { getCompletedCount, resetAll } from '@/lib/storage';
import { playClick } from '@/lib/sounds';

export default function HomeContent() {
  const router = useRouter();
  const done = getCompletedCount();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset ALL progress? This cannot be undone!')) {
      resetAll();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen honeycomb-bg relative">
      <FloatingParticles />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push('/')}
            className="text-3xl animate-bee-fly cursor-pointer"
          >
            🐝
          </motion.button>
          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleReset}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl sm:text-4xl font-black text-[#CE82FF]">
            Choose a Letter!
          </h1>
          <p className="text-gray-400 font-bold mt-1">
            Tap any letter to start learning
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-md mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-extrabold text-sm text-gray-500 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-[#FFC800]" />
              Your Journey
            </span>
            <span className="font-black text-[#58CC02]">{done} / 26</span>
          </div>
          <ProgressBar value={(done / 26) * 100} />
        </motion.div>

        <LetterGrid />

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { playClick(); router.push('/progress'); }}
            className="btn-chunky flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-700 font-extrabold text-base border-2 border-gray-200 border-b-4 border-b-gray-300 rounded-2xl shadow-md cursor-pointer"
          >
            <BarChart3 className="w-5 h-5 text-[#1CB0F6]" />
            My Progress
          </motion.button>
          <motion.button
            whileHover={done >= 26 ? { scale: 1.03 } : {}}
            whileTap={done >= 26 ? { scale: 0.97 } : {}}
            onClick={() => {
              if (done >= 26) { playClick(); router.push('/final-test'); }
            }}
            disabled={done < 26}
            className={`btn-chunky flex-1 flex items-center justify-center gap-2 px-6 py-4 font-extrabold text-base rounded-2xl shadow-md cursor-pointer
              ${done >= 26
                ? 'bg-[#FF9600] text-white border-b-4 border-[#cc7800]'
                : 'bg-gray-200 text-gray-400 border-b-4 border-gray-300 cursor-not-allowed'
              }`}
          >
            <Trophy className="w-5 h-5" />
            Final Big Test
          </motion.button>
        </div>
      </div>
    </div>
  );
}
