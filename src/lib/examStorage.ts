'use client';

// ===== EXAMS FEATURE — persistence =====
// Letter exams and the per-category final exam. Keys use the prefixes
// "exam_" and "final_exam_". Category spaces are stripped in keys, e.g.
//   exam_letter_Category1_A
//   final_exam_result_Category4
//   final_exam_progress_Category1

import { LETTERS } from './words';
import { countWords } from './wordBank';
import { getStars, isLetterComplete } from './wordBankStorage';

export interface ExamLetterResult {
  score: number;
  total: number;
  stars: number;
  date: number;
}

export interface FinalExamResult {
  score: number;
  total: number;
  stars: number;
  date: number;
  perLetter: Record<string, { score: number; total: number }>;
}

export interface ExamItem {
  word: string;
  letter: string;
}

export interface ExamAnswer {
  word: string;
  letter: string;
  correct: boolean;
}

export interface FinalExamProgress {
  order: ExamItem[];
  idx: number;
  results: ExamAnswer[];
}

function catKey(category: string): string {
  return category.replace(/\s+/g, '');
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

// ---- Letter exam ----

function letterKey(category: string, letter: string): string {
  return `exam_letter_${catKey(category)}_${letter}`;
}

export function getLetterExam(category: string, letter: string): ExamLetterResult | null {
  return read<ExamLetterResult | null>(letterKey(category, letter), null);
}

export function saveLetterExam(category: string, letter: string, score: number, total: number): ExamLetterResult {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const next: ExamLetterResult = { score, total, stars: getStars(pct), date: Date.now() };
  const prev = getLetterExam(category, letter);
  const best = prev && prev.score >= score ? { ...prev, date: next.date } : next;
  localStorage.setItem(letterKey(category, letter), JSON.stringify(best));
  return next; // return this attempt (the result screen shows what they just scored)
}

export function isExamTaken(category: string, letter: string): boolean {
  return getLetterExam(category, letter) !== null;
}

// ---- Final exam ----

export function lettersWithWords(category: string): string[] {
  return LETTERS.filter((l) => countWords(category, l) > 0);
}

/** True when every letter that has words has all 3 levels completed. */
export function allLettersComplete(category: string): boolean {
  const withWords = lettersWithWords(category);
  return withWords.length > 0 && withWords.every((l) => isLetterComplete(category, l));
}

function finalResultKey(category: string): string {
  return `final_exam_result_${catKey(category)}`;
}

function finalProgressKey(category: string): string {
  return `final_exam_progress_${catKey(category)}`;
}

export function getFinalResult(category: string): FinalExamResult | null {
  return read<FinalExamResult | null>(finalResultKey(category), null);
}

export function saveFinalResult(category: string, result: Omit<FinalExamResult, 'stars' | 'date'>): FinalExamResult {
  const pct = result.total > 0 ? Math.round((result.score / result.total) * 100) : 0;
  const next: FinalExamResult = { ...result, stars: getStars(pct), date: Date.now() };
  const prev = getFinalResult(category);
  const best = prev && prev.score >= result.score ? prev : next;
  localStorage.setItem(finalResultKey(category), JSON.stringify(best));
  return next;
}

export function getFinalProgress(category: string): FinalExamProgress | null {
  return read<FinalExamProgress | null>(finalProgressKey(category), null);
}

export function saveFinalProgress(category: string, progress: FinalExamProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(finalProgressKey(category), JSON.stringify(progress));
}

export function clearFinalProgress(category: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(finalProgressKey(category));
}
