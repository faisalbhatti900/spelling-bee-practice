'use client';

// ===== WORD BANK FEATURE — Web Speech API (clear, kid-friendly TTS) =====
// Pure browser speech synthesis — no third-party audio, works offline.

let selectedVoice: SpeechSynthesisVoice | null = null;
let voiceName = '';
let primed = false;

export function isSpeechAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

// getVoices() is async on some browsers — resolve once the list is ready.
function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!isSpeechAvailable()) return Promise.resolve([]);
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      resolve(voices);
      return;
    }
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener('voiceschanged', finish, { once: true });
    window.setTimeout(finish, 1200); // safety net if the event never fires
  });
}

const PREFERRED_NAMES = ['Samantha', 'Karen', 'Daniel', 'Moira', 'Tessa'];

function chooseVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices.length) return null;
  // 1) preferred high-quality named voices
  for (const name of PREFERRED_NAMES) {
    const match = voices.find((v) => v.name.includes(name));
    if (match) return match;
  }
  // 2) any English, locally-installed (downloaded high quality), non-"compact"
  const hq = voices.find(
    (v) => v.lang.toLowerCase().startsWith('en') && v.localService && !/compact/i.test(v.name),
  );
  if (hq) return hq;
  // 3) fallback: any English voice, else the first available
  return voices.find((v) => v.lang.toLowerCase().startsWith('en')) || voices[0] || null;
}

async function ensureVoice(): Promise<SpeechSynthesisVoice | null> {
  if (selectedVoice) return selectedVoice;
  const voices = await loadVoices();
  selectedVoice = chooseVoice(voices);
  voiceName = selectedVoice?.name ?? '';
  if (selectedVoice) {
    console.log(`[Word Bank] Speech voice selected: ${selectedVoice.name} (${selectedVoice.lang})`);
  }
  return selectedVoice;
}

/** Resolve & cache the best voice; returns its display name (for the UI). */
export async function initVoice(): Promise<string> {
  await ensureVoice();
  return voiceName;
}

export function getSelectedVoiceName(): string {
  return voiceName;
}

function makeUtterance(text: string, voice: SpeechSynthesisVoice | null): SpeechSynthesisUtterance {
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.75; // slow and clear for young learners
  u.pitch = 1.05; // slightly warm, less robotic
  u.volume = 1.0;
  if (voice) {
    u.voice = voice;
    u.lang = voice.lang;
  } else {
    u.lang = 'en-US';
  }
  return u;
}

function utter(text: string, voice: SpeechSynthesisVoice | null, onEnd?: () => void): void {
  const u = makeUtterance(text, voice);
  if (onEnd) u.onend = () => onEnd();
  window.speechSynthesis.speak(u);
}

export function cancelSpeech(): void {
  if (isSpeechAvailable()) window.speechSynthesis.cancel();
}

/**
 * iOS only allows speech after a user gesture. Call this from the first tap to
 * "unlock" audio so later (programmatic) speech works.
 */
export function primeSpeech(): void {
  if (!isSpeechAvailable() || primed) return;
  primed = true;
  const u = makeUtterance(' ', null);
  u.volume = 0;
  window.speechSynthesis.speak(u);
  ensureVoice();
}

/** Speak any text once. Cancels anything in progress, then waits 100ms. */
export async function speak(text: string): Promise<void> {
  if (!isSpeechAvailable()) return;
  window.speechSynthesis.cancel();
  const voice = await ensureVoice();
  window.setTimeout(() => utter(text, voice), 100);
}

/** Say the word, pause 1.5s, then say it again — helps kids register the spelling. */
export async function speakWord(word: string): Promise<void> {
  if (!isSpeechAvailable()) return;
  window.speechSynthesis.cancel();
  const voice = await ensureVoice();
  window.setTimeout(() => {
    utter(word, voice, () => {
      window.setTimeout(() => utter(word, voice), 1500);
    });
  }, 100);
}

/** "The word is X. X means <definition>." — definition skipped when unavailable. */
export async function speakSentence(word: string, def?: string): Promise<void> {
  const sentence = def ? `The word is ${word}. ${word} means ${def}.` : `The word is ${word}.`;
  await speak(sentence);
}

// Warm up the voice list as early as possible.
if (isSpeechAvailable()) {
  ensureVoice();
}
