'use client';

// Shared back button — one consistent look, tap-bounce and click sound used by
// every Word Bank screen (and the Spelling Bee Practice landing).

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { playClick } from '@/lib/sounds';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export default function BackButton({ onClick, label = 'Back', className = '' }: BackButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => { playClick(); onClick(); }}
      className={`flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-md font-extrabold text-gray-600 hover:text-gray-800 transition-colors cursor-pointer min-h-[44px] ${className}`}
    >
      <ArrowLeft className="w-5 h-5" /> {label}
    </motion.button>
  );
}
