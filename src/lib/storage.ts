'use client';

import { LETTERS } from './words';

export interface QuizResult {
  word: string;
  type: 'syn' | 'ant';
  correct: boolean;
  answer: string;
  correctAnswer: string;
}

interface LetterData {
  scores: { score: number; total: number; pct: number; date: number }[];
  wrongWords: Record<string, number>;
}

function getStore(): Record<string, LetterData> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem('spellingBee') || '{}');
  } catch {
    return {};
  }
}

function setStore(d: Record<string, LetterData>) {
  localStorage.setItem('spellingBee', JSON.stringify(d));
}

export function getLetterData(l: string): LetterData {
  const s = getStore();
  return s[l] || { scores: [], wrongWords: {} };
}

export function saveLetterScore(l: string, score: number, total: number, results: QuizResult[]) {
  const s = getStore();
  if (!s[l]) s[l] = { scores: [], wrongWords: {} };
  s[l].scores.push({ score, total, pct: Math.round((score / total) * 100), date: Date.now() });
  if (s[l].scores.length > 3) s[l].scores = s[l].scores.slice(-3);
  results.forEach((r) => {
    if (!r.correct) {
      s[l].wrongWords[r.word] = (s[l].wrongWords[r.word] || 0) + 1;
    }
  });
  setStore(s);
}

export function isLetterComplete(l: string): boolean {
  const d = getLetterData(l);
  return !!(d.scores && d.scores.length > 0);
}

export function getBestScore(l: string): number {
  const d = getLetterData(l);
  if (!d.scores || !d.scores.length) return 0;
  return Math.max(...d.scores.map((s) => s.pct));
}

export function getStarCount(pct: number): number {
  if (pct >= 90) return 5;
  if (pct >= 80) return 4;
  if (pct >= 70) return 3;
  if (pct >= 50) return 2;
  return pct > 0 ? 1 : 0;
}

export function isLetterUnlocked(l: string): boolean {
  const idx = LETTERS.indexOf(l);
  if (idx === 0) return true;
  return isLetterComplete(LETTERS[idx - 1]);
}

export function getCompletedCount(): number {
  return LETTERS.filter((l) => isLetterComplete(l)).length;
}

export function resetAll() {
  localStorage.removeItem('spellingBee');
}

export function getAllWeakWords(): { word: string; count: number; letter: string }[] {
  const store = getStore();
  const weak: { word: string; count: number; letter: string }[] = [];
  Object.keys(store).forEach((l) => {
    const ww = store[l].wrongWords || {};
    Object.keys(ww).forEach((w) => {
      if (ww[w] >= 1) weak.push({ word: w, count: ww[w], letter: l });
    });
  });
  return weak.sort((a, b) => b.count - a.count);
}
