'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number; // 0–5 earned stars
  max?: number;
  size?: number;
  animate?: boolean; // pop the earned stars in one by one
}

export default function StarRating({ value, max = 5, size = 28, animate = false }: StarRatingProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const earned = i < value;
        return (
          <motion.span
            key={i}
            initial={animate ? { scale: 0, rotate: -30, opacity: 0 } : false}
            animate={animate ? { scale: 1, rotate: 0, opacity: 1 } : undefined}
            transition={animate ? { delay: 0.2 + i * 0.18, type: 'spring', stiffness: 300, damping: 12 } : undefined}
          >
            <Star
              style={{ width: size, height: size }}
              className={earned ? 'text-[#FFC800]' : 'text-gray-200'}
              fill={earned ? '#FFC800' : '#e5e7eb'}
              strokeWidth={1.5}
            />
          </motion.span>
        );
      })}
    </div>
  );
}
