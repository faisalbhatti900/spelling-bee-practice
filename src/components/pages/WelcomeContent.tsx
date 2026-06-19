'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, Settings as SettingsIcon } from 'lucide-react';
import FloatingParticles from '@/components/FloatingParticles';
import Onboarding from '@/components/wordbank/Onboarding';
import Settings from '@/components/wordbank/Settings';
import { getProfile, type Profile } from '@/lib/profile';
import { playClick } from '@/lib/sounds';

interface Activity {
  emoji: string;
  title: string;
  desc: string;
  route: string;
  bg: string;
  border: string;
  badge?: string;
}

const activities: Activity[] = [
  {
    emoji: '🐝',
    title: 'Spelling Bee Practice',
    desc: 'Master synonyms & antonyms from A to Z',
    route: '/spelling-bee',
    bg: '#58CC02',
    border: '#46a302',
  },
  {
    emoji: '📚',
    title: 'Word Bank',
    desc: 'Build your very own collection of words',
    route: '/word-bank',
    bg: '#1CB0F6',
    border: '#1690c8',
    badge: 'New',
  },
];

export default function WelcomeContent() {
  const router = useRouter();
  // Client-only component (ssr:false), so reading localStorage at init is safe.
  const [profile, setProfile] = useState<Profile | null>(() => getProfile());
  const [view, setView] = useState<'hub' | 'settings'>('hub');

  if (!profile) return <Onboarding onDone={(p) => setProfile(p)} />;

  if (view === 'settings') {
    return (
      <Settings
        initial={profile}
        onSaved={(p) => { setProfile(p); setView('hub'); }}
        onBack={() => setView('hub')}
      />
    );
  }

  return (
    <div className="min-h-screen pattern-bg relative">
      <FloatingParticles />

      <button
        onClick={() => { playClick(); setView('settings'); }}
        className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        aria-label="Settings"
      >
        <SettingsIcon className="w-5 h-5" />
      </button>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <motion.div
          className="text-7xl sm:text-8xl mb-2"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🐝
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl sm:text-6xl font-black text-center leading-tight"
        >
          <span className="bg-linear-to-r from-[#CE82FF] via-[#1CB0F6] to-[#58CC02] bg-clip-text text-transparent">
            Word Wizards
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 text-lg sm:text-xl font-bold mt-4 text-center max-w-md"
        >
          Hi, {profile.name}! 👋 Pick an activity to begin.
        </motion.p>

        <div className="flex flex-col gap-5 mt-10 w-full max-w-md">
          {activities.map((a, i) => (
            <motion.button
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.15 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { playClick(); router.push(a.route); }}
              className="btn-chunky relative flex items-center gap-4 p-5 text-white text-left rounded-3xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
              style={{ backgroundColor: a.bg, borderBottom: `4px solid ${a.border}` }}
            >
              {a.badge && (
                <span className="absolute -top-2 -right-2 bg-[#FF9600] text-white text-xs font-black px-3 py-1 rounded-full border-b-2 border-[#cc7800] shadow">
                  {a.badge}
                </span>
              )}
              <span className="text-5xl shrink-0">{a.emoji}</span>
              <span className="flex-1 min-w-0">
                <span className="block text-xl sm:text-2xl font-black">{a.title}</span>
                <span className="block text-sm font-semibold text-white/90 mt-0.5">{a.desc}</span>
              </span>
              <ArrowRight className="w-6 h-6 shrink-0" />
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
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
