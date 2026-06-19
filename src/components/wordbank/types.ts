// ===== WORD BANK FEATURE — shared types & level metadata =====

import type { LevelNum } from '@/lib/wordBankStorage';

export type { LevelNum };

export type WBScreen =
  | 'letter' | 'level' | 'play' | 'result' | 'progress' | 'settings'
  | 'letterExam' | 'examResult' | 'finalExam' | 'finalResult';

export interface WordResult {
  word: string;
  correct: boolean;
}

export interface PlayResult {
  score: number;
  total: number;
  results: WordResult[];
  timeMs: number;
}

/** Friendly clock format: "45s" under a minute, otherwise "1:05". */
export function formatTime(ms: number): string {
  const s = Math.round(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m > 0 ? `${m}:${String(sec).padStart(2, '0')}` : `${sec}s`;
}

export const LEVEL_META: Record<LevelNum, { name: string; desc: string; color: string; darker: string; emoji: string }> = {
  1: { name: 'Listen and Spell', desc: 'Hear the word, then type it', color: '#58CC02', darker: '#46a302', emoji: '🎧' },
  2: { name: 'Fill the Gaps', desc: 'Complete the missing letters', color: '#1CB0F6', darker: '#0f8abf', emoji: '🧩' },
  3: { name: 'Jumbled Letters', desc: 'Unscramble the mixed-up word', color: '#FF9600', darker: '#cc7800', emoji: '🔀' },
};

/** Bright tile palette for Level 3 — colour is chosen by letter index so a word always looks the same. */
export const TILE_PALETTE = ['#CE82FF', '#58CC02', '#FF9600', '#1CB0F6', '#FF6B6B'];

export const ENCOURAGE: Record<number, string> = {
  5: "Perfect! You're a spelling champion! 🏆",
  4: 'Brilliant! Almost perfect! ⭐',
  3: 'Great job! Keep practising! 💪',
  2: "Good try! Let's do it again! 🌈",
  1: "Don't give up! You're getting better! 🐝",
};
