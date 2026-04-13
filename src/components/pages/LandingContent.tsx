'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, BarChart3, Zap, Star, Heart, Sparkles, ArrowRight } from 'lucide-react';
import FloatingParticles from '@/components/FloatingParticles';
import { playClick } from '@/lib/sounds';

const features = [
  { icon: BookOpen, color: '#CE82FF', title: '200+ Words', desc: 'Learn synonyms & antonyms A to Z' },
  { icon: Zap, color: '#FF9600', title: 'Fun Quizzes', desc: 'Test your knowledge with interactive quizzes' },
  { icon: Star, color: '#FFC800', title: 'Earn Stars', desc: 'Collect stars and track your progress' },
  { icon: Trophy, color: '#58CC02', title: 'Final Challenge', desc: 'Beat the big test to become a Word Wizard!' },
];

export default function LandingContent() {
  const router = useRouter();

  return (
    <div className="min-h-screen pattern-bg relative">
      <FloatingParticles />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pb-8">
        <motion.div
          className="text-8xl sm:text-9xl mb-2"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🐝
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl sm:text-7xl font-black text-center leading-tight"
        >
          <span className="bg-linear-to-r from-[#CE82FF] via-[#1CB0F6] to-[#58CC02] bg-clip-text text-transparent">
            Spelling Bee
          </span>
          <br />
          <span className="text-[#FF9600]">Practice</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 text-lg sm:text-xl font-bold mt-4 text-center max-w-md"
        >
          Master synonyms & antonyms from A to Z with fun quizzes, sounds, and rewards!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-10 w-full max-w-sm sm:max-w-lg"
        >
          <button
            onClick={() => { playClick(); router.push('/home'); }}
            className="btn-chunky flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-[#58CC02] text-white text-xl border-b-4 border-[#46a302] rounded-2xl shadow-lg hover:shadow-xl hover:brightness-110 transition-all cursor-pointer"
          >
            Start Learning <ArrowRight className="w-6 h-6" />
          </button>
          <button
            onClick={() => { playClick(); router.push('/progress'); }}
            className="btn-chunky flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-white text-gray-700 text-xl border-2 border-gray-200 border-b-4 border-b-gray-300 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <BarChart3 className="w-6 h-6 text-[#1CB0F6]" /> My Progress
          </button>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 w-full max-w-2xl">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: f.color + '20' }}
              >
                <f.icon className="w-6 h-6" style={{ color: f.color }} />
              </div>
              <h3 className="font-extrabold text-sm">{f.title}</h3>
              <p className="text-xs text-gray-400 font-semibold mt-1">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center gap-2 mt-10 text-gray-400 text-sm font-bold"
        >
          <Heart className="w-4 h-4 text-[#FF86D0]" />
          Made for young learners
          <Sparkles className="w-4 h-4 text-[#FFC800]" />
        </motion.div>
      </div>
    </div>
  );
}
