'use client';

// ===== WORD BANK FEATURE — progress persistence =====
// All keys are prefixed "wb_" so they never collide with the existing
// Spelling Bee Practice data (stored under "spellingBee").
//
//   wb_progress_{category}_{letter}_L{level} = { score, total, stars, date }
//   wb_wrongwords_{category}                  = { word: wrongCount, ... }

import { LETTERS } from './words';
import { countWords } from './wordBank';

export type LevelNum = 1 | 2 | 3;

export interface LevelProgress {
  score: number;
  total: number;
  stars: number;
  date: number;
  timeMs: number; // how long the saved attempt took (for speed progress)
}

function progressKey(category: string, letter: string, level: LevelNum): string {
  return `wb_progress_${category}_${letter}_L${level}`;
}

function wrongKey(category: string): string {
  return `wb_wrongwords_${category}`;
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/** Star rating from a percentage, per the Word Bank spec (a completed level is always >= 1 star). */
export function getStars(pct: number): number {
  if (pct >= 90) return 5;
  if (pct >= 80) return 4;
  if (pct >= 65) return 3;
  if (pct >= 50) return 2;
  return 1;
}

export function getLevelProgress(category: string, letter: string, level: LevelNum): LevelProgress | null {
  return readJson<LevelProgress | null>(progressKey(category, letter, level), null);
}

export function saveLevelProgress(
  category: string,
  letter: string,
  level: LevelNum,
  score: number,
  total: number,
  timeMs: number,
): LevelProgress {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const next: LevelProgress = { score, total, stars: getStars(pct), date: Date.now(), timeMs };
  const prev = getLevelProgress(category, letter, level);
  // Keep the better attempt so re-tries never erase a higher score, but always
  // keep the fastest time seen so speed improvements are recorded.
  if (prev && prev.stars >= next.stars && prev.score >= score) {
    const kept: LevelProgress = {
      ...prev,
      date: next.date,
      timeMs: Math.min(prev.timeMs || timeMs, timeMs),
    };
    localStorage.setItem(progressKey(category, letter, level), JSON.stringify(kept));
    return kept;
  }
  localStorage.setItem(progressKey(category, letter, level), JSON.stringify(next));
  return next;
}

export function isLevelComplete(category: string, letter: string, level: LevelNum): boolean {
  return getLevelProgress(category, letter, level) !== null;
}

// All levels are open as long as the letter has words — students pick any
// level in any order (no L1 -> L2 -> L3 progression gate).
export function isLevelUnlocked(category: string, letter: string): boolean {
  return countWords(category, letter) > 0;
}

export function getLevelStars(category: string, letter: string, level: LevelNum): number {
  return getLevelProgress(category, letter, level)?.stars ?? 0;
}

export function isLetterComplete(category: string, letter: string): boolean {
  if (countWords(category, letter) === 0) return false;
  return [1, 2, 3].every((lvl) => isLevelComplete(category, letter, lvl as LevelNum));
}

/**
 * Letters unlock one at a time: the first letter that has words is always open,
 * and each subsequent letter unlocks only once the previous one is fully complete.
 */
export function isLetterUnlockedSeq(category: string, letter: string): boolean {
  const sequence = LETTERS.filter((l) => countWords(category, l) > 0);
  const idx = sequence.indexOf(letter);
  if (idx < 0) return false; // no words for this letter
  if (idx === 0) return true; // first letter is always open
  return isLetterComplete(category, sequence[idx - 1]);
}

// ---- Wrong / hard words ----

export function addWrongWords(category: string, words: string[]): void {
  if (typeof window === 'undefined' || words.length === 0) return;
  const map = readJson<Record<string, number>>(wrongKey(category), {});
  words.forEach((w) => {
    map[w] = (map[w] || 0) + 1;
  });
  localStorage.setItem(wrongKey(category), JSON.stringify(map));
}

export function getWrongWords(category: string): Record<string, number> {
  return readJson<Record<string, number>>(wrongKey(category), {});
}

/** Words the student has got wrong 2+ times — "Words I find hard". */
export function getHardWords(category: string): { word: string; count: number }[] {
  const map = getWrongWords(category);
  return Object.keys(map)
    .filter((w) => map[w] >= 2)
    .map((w) => ({ word: w, count: map[w] }))
    .sort((a, b) => b.count - a.count);
}

// ---- Aggregate stats for the progress screen ----

export interface CategoryStats {
  lettersCompleted: number;
  totalStars: number;
  avgScore: number;
}

export function getCategoryStats(category: string, letters: string[]): CategoryStats {
  let lettersCompleted = 0;
  let totalStars = 0;
  let pctSum = 0;
  let pctCount = 0;

  letters.forEach((letter) => {
    if (isLetterComplete(category, letter)) lettersCompleted += 1;
    ([1, 2, 3] as LevelNum[]).forEach((level) => {
      const p = getLevelProgress(category, letter, level);
      if (p) {
        totalStars += p.stars;
        pctSum += p.total > 0 ? (p.score / p.total) * 100 : 0;
        pctCount += 1;
      }
    });
  });

  return {
    lettersCompleted,
    totalStars,
    avgScore: pctCount > 0 ? Math.round(pctSum / pctCount) : 0,
  };
}
