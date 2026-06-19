'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, MessageSquareText } from 'lucide-react';
import { type WordItem, wordText, wordDef } from '@/lib/wordBank';
import { speakWord, speakSentence, spellOut, initVoice, isSpeechAvailable } from '@/lib/speech';
import { playCorrect, playWrong } from '@/lib/sounds';
import type { PlayResult, WordResult } from './types';
import WordBankPlayHeader from './WordBankPlayHeader';
import { useLevelTimer } from './useLevelTimer';

interface Level1Props {
  items: WordItem[];
  onComplete: (result: PlayResult) => void;
  onBack: () => void;
}

export default function Level1ListenSpell({ items, onComplete, onBack }: Level1Props) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<'input' | 'correct' | 'wrong'>('input');
  const [wrongOnce, setWrongOnce] = useState(false);
  const resultsRef = useRef<WordResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const speechOn = isSpeechAvailable();
  const { elapsedMs, stop } = useLevelTimer();
  const [voiceLabel, setVoiceLabel] = useState('');

  useEffect(() => {
    if (speechOn) initVoice().then(setVoiceLabel);
  }, [speechOn]);

  const item = items[idx];
  const word = wordText(item);
  const total = items.length;

  // Speak each new word automatically (once, then repeat after 1s).
  useEffect(() => {
    if (speechOn) speakWord(word);
    inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const finishWord = (correct: boolean) => {
    resultsRef.current.push({ word, correct });
    setInput('');
    setWrongOnce(false);
    setPhase('input');
    if (idx + 1 < total) {
      setIdx(idx + 1);
    } else {
      const score = resultsRef.current.filter((r) => r.correct).length;
      onComplete({ score, total, results: resultsRef.current, timeMs: stop() });
    }
  };

  const handleSubmit = () => {
    if (phase !== 'input' || !input.trim()) return;
    if (input.trim().toLowerCase() === word.toLowerCase()) {
      const wasCorrect = !wrongOnce;
      setPhase('correct');
      playCorrect();
      setTimeout(() => finishWord(wasCorrect), 1500);
    } else {
      setWrongOnce(true);
      setPhase('wrong');
      playWrong();
    }
  };

  return (
    <div className="relative z-10 max-w-xl mx-auto px-4 py-6">
      <WordBankPlayHeader idx={idx} total={total} color="#58CC02" elapsedMs={elapsedMs} onBack={onBack} />

      <div className="flex flex-col items-center mt-8">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => { if (speechOn) speakWord(word); }}
          className="w-20 h-20 rounded-full bg-[#1CB0F6] text-white flex items-center justify-center shadow-lg border-b-4 border-[#0f8abf] animate-pulse-glow cursor-pointer"
          aria-label="Hear the word"
        >
          <Volume2 className="w-9 h-9" />
        </motion.button>

        {speechOn && voiceLabel && (
          <p className="mt-1.5 text-[11px] font-semibold text-gray-400">Voice: {voiceLabel}</p>
        )}

        <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => { if (speechOn) speakSentence(word, wordDef(item)); }}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-md font-extrabold text-[#CE82FF] hover:brightness-95 transition cursor-pointer min-h-[44px]"
          >
            <MessageSquareText className="w-5 h-5" /> Hear in a sentence
          </button>
          <button
            onClick={() => { if (speechOn) spellOut(word); }}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-md font-extrabold text-[#1CB0F6] hover:brightness-95 transition cursor-pointer min-h-[44px]"
          >
            🔤 Spell it
          </button>
        </div>

        {!speechOn && (
          <div className="mt-4 text-center">
            <p className="text-[#FF9600] font-bold text-sm">🔇 Cannot play audio on this device</p>
            <p className="text-3xl font-black text-gray-700 mt-2 tracking-wide">{word}</p>
          </div>
        )}

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
          disabled={phase === 'correct'}
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Type the word…"
          className={`mt-6 w-full text-center rounded-2xl px-5 py-4 font-black outline-none border-4 transition-colors
            ${phase === 'correct' ? 'border-[#58CC02] bg-green-50 text-[#46a302] animate-bounce-in'
              : phase === 'wrong' ? 'border-[#FF4B4B] bg-red-50 text-[#d83b3b] animate-shake'
              : 'border-gray-200 bg-white text-gray-700 focus:border-[#1CB0F6]'}`}
          style={{ fontSize: 44 }}
        />

        {phase === 'input' && (
          <button
            onClick={handleSubmit}
            className="btn-chunky w-full mt-5 px-8 py-4 bg-[#58CC02] text-white text-xl border-b-4 border-[#46a302] rounded-2xl shadow-lg hover:brightness-110 transition cursor-pointer"
          >
            Check
          </button>
        )}

        {phase === 'correct' && (
          <p className="mt-5 text-2xl font-black text-[#58CC02]">Correct! Well done! ⭐</p>
        )}

        {phase === 'wrong' && (
          <div className="mt-5 w-full text-center">
            <p className="font-black text-gray-600">Oops! The word was:</p>
            <p className="text-4xl font-black text-[#FF4B4B] my-2 tracking-wide">{word}</p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => { setPhase('input'); setInput(''); if (speechOn) speakWord(word); inputRef.current?.focus(); }}
                className="btn-chunky flex-1 px-5 py-3 bg-white text-gray-700 font-extrabold border-2 border-gray-200 border-b-4 border-b-gray-300 rounded-2xl cursor-pointer"
              >
                Try again
              </button>
              <button
                onClick={() => finishWord(false)}
                className="btn-chunky flex-1 px-5 py-3 bg-[#FF9600] text-white font-extrabold border-b-4 border-[#cc7800] rounded-2xl cursor-pointer"
              >
                Next word →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
