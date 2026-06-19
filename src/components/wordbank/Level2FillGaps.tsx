'use client';

import { useEffect, useRef, useState } from 'react';
import { type WordItem, wordText } from '@/lib/wordBank';
import { playWord } from '@/lib/wordAudio';
import { playCorrect, playWrong, playClick } from '@/lib/sounds';
import type { PlayResult, WordResult } from './types';
import WordBankPlayHeader from './WordBankPlayHeader';
import { useLevelTimer } from './useLevelTimer';

interface Level2Props {
  items: WordItem[];
  onComplete: (result: PlayResult) => void;
  onBack: () => void;
}

function blankCountFor(len: number): number {
  if (len <= 5) return 1;
  if (len <= 8) return 2;
  if (len <= 12) return 3;
  return 4;
}

// Pick which letter positions to hide — never the first letter, never spaces.
function pickBlanks(word: string): number[] {
  const candidates = word.split('').map((_, i) => i).filter((i) => i > 0 && /[a-z]/i.test(word[i]));
  const want = Math.min(blankCountFor(word.replace(/\s/g, '').length), candidates.length);
  const pool = [...candidates];
  const chosen: number[] = [];
  while (chosen.length < want && pool.length) {
    const r = Math.floor(Math.random() * pool.length);
    chosen.push(pool.splice(r, 1)[0]);
  }
  return chosen.sort((a, b) => a - b);
}

export default function Level2FillGaps({ items, onComplete, onBack }: Level2Props) {
  const [idx, setIdx] = useState(0);
  const [blanks, setBlanks] = useState<number[]>([]);
  const [entered, setEntered] = useState<Record<number, string>>({});
  const [phase, setPhase] = useState<'input' | 'correct' | 'wrong'>('input');
  const [wrongOnce, setWrongOnce] = useState(false);
  const resultsRef = useRef<WordResult[]>([]);
  const inputsRef = useRef<Record<number, HTMLInputElement | null>>({});
  const { elapsedMs, stop } = useLevelTimer();

  const word = wordText(items[idx]);
  const total = items.length;

  useEffect(() => {
    const b = pickBlanks(word);
    setBlanks(b);
    setEntered({});
    setPhase('input');
    setWrongOnce(false);
    setTimeout(() => inputsRef.current[b[0]]?.focus(), 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const allFilled = blanks.length > 0 && blanks.every((b) => entered[b]);

  // Auto-check 0.5s after the last blank is filled.
  useEffect(() => {
    if (phase !== 'input' || !allFilled) return;
    const t = setTimeout(() => check(), 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entered, phase, allFilled]);

  const finishWord = (correct: boolean) => {
    resultsRef.current.push({ word, correct });
    if (idx + 1 < total) {
      setIdx(idx + 1);
    } else {
      const score = resultsRef.current.filter((r) => r.correct).length;
      onComplete({ score, total, results: resultsRef.current, timeMs: stop() });
    }
  };

  const check = () => {
    const allCorrect = blanks.every((b) => (entered[b] || '').toLowerCase() === word[b].toLowerCase());
    if (allCorrect) {
      setPhase('correct');
      playCorrect();
      const wasCorrect = !wrongOnce;
      setTimeout(() => playWord(word), 600); // speak the word after the green animation
      setTimeout(() => finishWord(wasCorrect), 2100); // then move on 1.5s later
    } else {
      setPhase('wrong');
      playWrong();
      setWrongOnce(true);
    }
  };

  const handleType = (pos: number, val: string) => {
    const ch = val.slice(-1);
    if (!/[a-z]/i.test(ch) && ch !== '') return;
    setEntered((e) => ({ ...e, [pos]: ch }));
    if (ch) {
      const next = blanks.find((b) => b > pos);
      if (next != null) inputsRef.current[next]?.focus();
    }
  };

  const handleKey = (pos: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !entered[pos]) {
      const prev = [...blanks].reverse().find((b) => b < pos);
      if (prev != null) {
        setEntered((en) => ({ ...en, [prev]: '' }));
        inputsRef.current[prev]?.focus();
      }
    }
  };

  const resetBlanks = () => {
    setEntered({});
    setPhase('input');
    setTimeout(() => inputsRef.current[blanks[0]]?.focus(), 50);
  };

  return (
    <div className="relative z-10 max-w-xl mx-auto px-4 py-6">
      <WordBankPlayHeader idx={idx} total={total} color="#1CB0F6" elapsedMs={elapsedMs} onBack={onBack} />

      <p className="text-center text-gray-500 font-bold mt-6 mb-4">Fill in the missing letters!</p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {word.split('').map((ch, i) => {
          const isBlank = blanks.includes(i);
          const wrong = phase === 'wrong' && isBlank && (entered[i] || '').toLowerCase() !== word[i].toLowerCase();
          if (ch === ' ') return <span key={i} className="w-3" />;
          if (!isBlank) {
            return (
              <div key={i} className="flex items-center justify-center rounded-xl bg-gray-200 text-gray-500 font-black"
                style={{ width: 52, height: 64, fontSize: 28 }}>
                {ch.toUpperCase()}
              </div>
            );
          }
          return (
            <div key={i} className="relative">
              {wrong && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-sm font-black text-[#FF4B4B]">
                  {word[i].toUpperCase()}
                </span>
              )}
              <input
                ref={(el) => { inputsRef.current[i] = el; }}
                value={(entered[i] || '').toUpperCase()}
                onChange={(e) => handleType(i, e.target.value)}
                onKeyDown={(e) => handleKey(i, e)}
                disabled={phase === 'correct'}
                maxLength={1}
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
                className={`text-center rounded-xl font-black outline-none border-[3px] transition-colors
                  ${phase === 'correct' ? 'border-[#58CC02] bg-green-50 text-[#46a302] animate-bounce-in'
                    : wrong ? 'border-[#FF4B4B] bg-red-50 text-[#d83b3b] animate-shake'
                    : 'border-dashed border-[#CE82FF] bg-white text-gray-700 focus:bg-purple-50'}`}
                style={{ width: 52, height: 64, fontSize: 28 }}
              />
            </div>
          );
        })}
      </div>

      {phase === 'correct' && <p className="text-center mt-8 text-2xl font-black text-[#58CC02]">Perfect! 🎉</p>}

      {phase === 'wrong' && (
        <div className="mt-8 text-center">
          <p className="font-black text-[#FF4B4B] text-lg">Almost! Check the red letters</p>
          <div className="flex gap-3 mt-3">
            <button onClick={() => { playClick(); resetBlanks(); }}
              className="btn-chunky flex-1 px-5 py-3 bg-white text-gray-700 font-extrabold border-2 border-gray-200 border-b-4 border-b-gray-300 rounded-2xl cursor-pointer">
              Try again
            </button>
            <button onClick={() => finishWord(false)}
              className="btn-chunky flex-1 px-5 py-3 bg-[#FF9600] text-white font-extrabold border-b-4 border-[#cc7800] rounded-2xl cursor-pointer">
              Next word →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
