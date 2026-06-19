'use client';

// ===== PROFILE — onboarding (name + category) =====
// Matches the app's look: pattern background, floating particles, chunky
// buttons and the bee colour palette.

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import FloatingParticles from '@/components/FloatingParticles';
import { getCategories } from '@/lib/wordBank';
import { saveProfile, type Profile } from '@/lib/profile';
import { playClick } from '@/lib/sounds';

interface OnboardingProps {
  onDone: (profile: Profile) => void;
}

export default function Onboarding({ onDone }: OnboardingProps) {
  const categories = getCategories();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const ready = name.trim().length > 0 && category !== '';

  const submit = () => {
    if (!ready) return;
    playClick();
    const profile: Profile = { name: name.trim(), category };
    saveProfile(profile);
    onDone(profile);
  };

  return (
    <div className="min-h-screen pattern-bg relative">
      <FloatingParticles />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <motion.div
          className="text-7xl mb-2"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🐝
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-black text-center leading-tight"
        >
          <span className="bg-linear-to-r from-[#CE82FF] via-[#1CB0F6] to-[#58CC02] bg-clip-text text-transparent">
            Welcome!
          </span>
        </motion.h1>
        <p className="text-gray-500 font-bold mt-3 text-center text-lg">Let&apos;s set up your profile</p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-sm mt-8 flex flex-col gap-5"
        >
          <div>
            <label className="block font-extrabold text-gray-600 mb-2">Your name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
              placeholder="Type your name…"
              autoFocus
              className="w-full rounded-2xl px-5 py-4 text-xl font-black text-gray-700 outline-none border-4 border-gray-200 bg-white focus:border-[#1CB0F6] min-h-[56px]"
            />
          </div>

          <div>
            <label className="block font-extrabold text-gray-600 mb-2">Your category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl px-5 py-4 text-xl font-black text-gray-700 outline-none border-4 border-gray-200 bg-white focus:border-[#1CB0F6] cursor-pointer min-h-[56px]"
            >
              <option value="" disabled>Select a category…</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            onClick={submit}
            disabled={!ready}
            className="btn-chunky flex items-center justify-center gap-3 mt-2 px-8 py-4 bg-[#58CC02] text-white text-xl border-b-4 border-[#46a302] rounded-2xl shadow-lg hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Let&apos;s Go! <ArrowRight className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
