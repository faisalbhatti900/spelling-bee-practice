'use client';

import { ArrowLeft, Clock } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import { playClick } from '@/lib/sounds';
import { formatTime } from './types';

interface WordBankPlayHeaderProps {
  idx: number;
  total: number;
  color: string;
  elapsedMs: number;
  onBack: () => void;
}

export default function WordBankPlayHeader({ idx, total, color, elapsedMs, onBack }: WordBankPlayHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => { playClick(); onBack(); }}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-md font-extrabold text-gray-600 hover:text-gray-800 transition-colors cursor-pointer min-h-[44px]"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <div
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white shadow-md font-black tabular-nums min-h-[44px]"
          style={{ color }}
          aria-label="Time elapsed"
        >
          <Clock className="w-5 h-5" />
          {formatTime(elapsedMs)}
        </div>
      </div>

      <div className="text-center mb-2 font-black text-2xl text-gray-700">Word {idx + 1} of {total}</div>
      <ProgressBar value={(idx / total) * 100} color={color} />
    </>
  );
}
