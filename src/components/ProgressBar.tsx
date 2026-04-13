'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  height?: number;
  showGlow?: boolean;
}

export default function ProgressBar({ value, color = '#58CC02', height = 12, showGlow = true }: ProgressBarProps) {
  return (
    <div
      className="w-full rounded-full overflow-hidden bg-gray-200/60"
      style={{ height }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="h-full rounded-full relative"
        style={{
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          boxShadow: showGlow ? `0 0 12px ${color}60` : 'none',
        }}
      >
        {showGlow && value > 5 && (
          <div className="absolute right-0 top-0 bottom-0 w-4 rounded-full bg-white/30 blur-sm" />
        )}
      </motion.div>
    </div>
  );
}
