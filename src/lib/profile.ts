'use client';

// ===== PROFILE — student name + chosen category =====
// Stored under "wb_profile". The category drives which Word Bank word set the
// student sees; progress is already kept separately per category.

import { getCategories } from './wordBank';

export interface Profile {
  name: string;
  category: string;
}

const KEY = 'wb_profile';

export function getProfile(): Profile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Profile;
    // Guard against a stale category that no longer exists in the data.
    if (!getCategories().includes(p.category)) return null;
    return p;
  } catch {
    return null;
  }
}

export function saveProfile(profile: Profile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(profile));
}

export function clearProfile(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
}

/** Clear all Word Bank level/exam progress (keeps the profile and the original
 *  Spelling Bee Practice data untouched). */
export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  const prefixes = ['wb_progress_', 'wb_wrongwords_', 'exam_', 'final_exam_'];
  const toRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && prefixes.some((p) => k.startsWith(p))) toRemove.push(k);
  }
  toRemove.forEach((k) => localStorage.removeItem(k));
}
