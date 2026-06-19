'use client';

// ===== PROFILE — settings (edit name / category, reset progress) =====

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Trash2 } from 'lucide-react';
import FloatingParticles from '@/components/FloatingParticles';
import BackButton from '@/components/BackButton';
import { getCategories } from '@/lib/wordBank';
import { saveProfile, resetProgress, type Profile } from '@/lib/profile';
import { playClick } from '@/lib/sounds';

interface SettingsProps {
  initial: Profile;
  onSaved: (profile: Profile) => void;
  onBack: () => void;
}

export default function Settings({ initial, onSaved, onBack }: SettingsProps) {
  const categories = getCategories();
  const [name, setName] = useState(initial.name);
  const [category, setCategory] = useState(initial.category);
  const ready = name.trim().length > 0 && category !== '';

  const save = () => {
    if (!ready) return;
    playClick();
    const profile: Profile = { name: name.trim(), category };
    saveProfile(profile);
    onSaved(profile);
  };

  const handleReset = () => {
    if (confirm('Reset ALL Word Bank progress (levels and exams)? This cannot be undone.')) {
      resetProgress();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen pattern-bg relative">
      <FloatingParticles />
      <div className="relative z-10 max-w-md mx-auto px-4 py-6">
        <BackButton onClick={onBack} className="mb-5" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black text-center text-[#CE82FF] mb-6"
        >
          Settings ⚙️
        </motion.h1>

        <div className="flex flex-col gap-5">
          <div>
            <label className="block font-extrabold text-gray-600 mb-2">Your name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            onClick={save}
            disabled={!ready}
            className="btn-chunky flex items-center justify-center gap-2 px-6 py-4 bg-[#58CC02] text-white font-extrabold text-lg border-b-4 border-[#46a302] rounded-2xl shadow-md hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Save className="w-5 h-5" /> Save changes
          </button>

          <button
            onClick={handleReset}
            className="btn-chunky flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#FF4B4B] font-extrabold border-2 border-[#FF4B4B]/30 border-b-4 border-b-[#FF4B4B]/40 rounded-2xl shadow-md hover:bg-red-50 transition cursor-pointer mt-2"
          >
            <Trash2 className="w-5 h-5" /> Reset all progress
          </button>
        </div>
      </div>
    </div>
  );
}
