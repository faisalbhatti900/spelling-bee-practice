'use client';

// ===== WORD BANK FEATURE — Web Speech API helper =====
// Pure browser speech synthesis — no third-party audio, works offline.
// We pick the CLEAREST available English voice (natural voices like
// Samantha / Google US English) and avoid the robotic "compact"/novelty
// voices that browsers often default to.

export function isSpeechAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

// Higher score = clearer / more natural. Ordered list of preferred voice names.
const PREFERRED = [
  'natural', 'google us english', 'google uk english female', 'google uk english male',
  'samantha', 'karen', 'serena', 'moira', 'aria', 'jenny', 'libby', 'sonia', 'daniel', 'tessa',
];
// Known robotic / novelty macOS voices to push to the bottom.
const ROBOTIC = /(albert|zarvox|trinoids|bells|bad news|good news|boing|jester|organ|cellos|wobble|whisper|superstar|bahh|deranged|hysterical|pipe|bubbles|fred|junior|ralph|kathy|princess|flo|grandma|grandpa|reed|rocko|sandy|shelley|eddy)/;

function scoreVoice(v: SpeechSynthesisVoice): number {
  if (!/^en/i.test(v.lang)) return -1; // English only
  const name = v.name.toLowerCase();
  let score = 0;
  const pref = PREFERRED.findIndex((p) => name.includes(p));
  if (pref !== -1) score += 100 - pref;
  if (/en[-_]us/i.test(v.lang)) score += 6;
  else if (/en[-_]gb/i.test(v.lang)) score += 5;
  if (v.localService) score += 2; // offline-capable
  if (ROBOTIC.test(name)) score -= 60;
  return score;
}

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickEnglishVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechAvailable()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return cachedVoice;
  const best = voices
    .map((v) => ({ v, s: scoreVoice(v) }))
    .filter((x) => x.s >= 0)
    .sort((a, b) => b.s - a.s)[0];
  cachedVoice = best ? best.v : voices[0];
  return cachedVoice;
}

export function cancelSpeech(): void {
  if (isSpeechAvailable()) window.speechSynthesis.cancel();
}

interface SpeakOptions {
  rate?: number;
  pitch?: number;
  onEnd?: () => void;
}

// rate 0.85 = slow & clear for young learners without sounding dragged-out.
export function speak(text: string, { rate = 0.85, pitch = 1.0, onEnd }: SpeakOptions = {}): void {
  if (!isSpeechAvailable()) {
    onEnd?.();
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = rate;
  utter.pitch = pitch;
  utter.lang = 'en-US';
  const voice = pickEnglishVoice();
  if (voice) {
    utter.voice = voice;
    utter.lang = voice.lang;
  }
  if (onEnd) utter.onend = () => onEnd();
  synth.speak(utter);
}

/** Speak the word once, then automatically repeat it after 1 second (Level 1 behaviour). */
export function speakWord(word: string, repeat = true): void {
  speak(word, {
    onEnd: repeat ? () => window.setTimeout(() => speak(word), 1000) : undefined,
  });
}

/** "The word is X. X means <definition>." — definition is skipped when unavailable. */
export function speakSentence(word: string, def?: string): void {
  const sentence = def ? `The word is ${word}. ${word} means ${def}.` : `The word is ${word}.`;
  speak(sentence);
}

// Voices load asynchronously; warm them up and re-pick once they arrive.
if (isSpeechAvailable()) {
  pickEnglishVoice();
  window.speechSynthesis.onvoiceschanged = () => pickEnglishVoice();
}
