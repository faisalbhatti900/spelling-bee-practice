'use client';

// ===== WORD AUDIO — pre-generated clips with live-speech fallback =====
// Plays one clean clip per word from /public/audio/<slug>.m4a, falling back to
// live Web Speech if a clip is missing.
//
// IMPORTANT: only ONE word ever plays at a time. Every play first stops whatever
// is currently playing (clip + any live speech), so moving to the next word can
// never overlap with the previous word's audio.

import { speak, cancelSpeech, isSpeechAvailable } from './speech';

let currentAudio: HTMLAudioElement | null = null;

export function wordSlug(word: string): string {
  return word.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function srcFor(word: string): string {
  return `/audio/${wordSlug(word)}.m4a`;
}

/** Stop any word audio currently playing (clip + live speech). */
export function stopWord(): void {
  if (currentAudio) {
    currentAudio.onerror = null;
    currentAudio.pause();
    try { currentAudio.currentTime = 0; } catch { /* ignore */ }
    currentAudio = null;
  }
  cancelSpeech();
}

/** Play a word once. Stops any previous word audio first. */
export function playWord(word: string): void {
  if (typeof window === 'undefined') return;
  stopWord();

  let audio: HTMLAudioElement;
  try {
    audio = new Audio(srcFor(word));
  } catch {
    if (isSpeechAvailable()) speak(word);
    return;
  }
  currentAudio = audio;

  audio.play().catch(() => {
    // Clip missing / blocked — fall back to live speech, but only if this is
    // still the word the user is on (avoids a late fallback for an old word).
    if (currentAudio === audio && isSpeechAvailable()) speak(word);
  });
}
