'use client';

// ===== WORD AUDIO — pre-generated clips with live-speech fallback =====
// Each word has a clean, pre-generated clip in /public/audio/<slug>.m4a
// (made once with a high-quality voice). We play that file for consistent,
// clear audio on every device. If a clip is missing (not generated yet) or
// can't play, we fall back to the live Web Speech voice — so the app always
// has audio and there is never a regression.

import { speak, speakWord as liveSpeakWord, isSpeechAvailable } from './speech';

export function wordSlug(word: string): string {
  return word.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function srcFor(word: string): string {
  return `/audio/${wordSlug(word)}.m4a`;
}

/**
 * Play a word. With `repeat`, it is said twice (clip plays, then again after
 * 1.5s) to help young spellers — matching the old live behaviour.
 * Falls back to live speech if the clip is unavailable.
 */
export function playWord(word: string, repeat = false): void {
  if (typeof window === 'undefined') return;

  const fallback = () => {
    if (!isSpeechAvailable()) return;
    if (repeat) liveSpeakWord(word);
    else speak(word);
  };

  let audio: HTMLAudioElement;
  try {
    audio = new Audio(srcFor(word));
  } catch {
    fallback();
    return;
  }

  if (repeat) {
    audio.onended = () => {
      window.setTimeout(() => { audio.play().catch(() => {}); }, 1500);
    };
  }

  audio.play().catch(() => fallback());
}
