'use client';

// ===== EXAMS FEATURE — shared exam play (listen and type) =====
// Pure listen-and-type: speaks the word, 30s countdown per word, max 3 plays,
// no hints. Used for both the Letter Exam and the Final Exam.

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Pause } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import BackButton from '@/components/BackButton';
import { playWord, stopWord } from '@/lib/wordAudio';
import { playCorrect, playWrong, playClick } from '@/lib/sounds';
import type { ExamItem, ExamAnswer } from '@/lib/examStorage';

const SECONDS = 30;
const MAX_PLAYS = 3;

interface ExamRunnerProps {
  items: ExamItem[];
  title: string;
  color: string;
  showLetterSection?: boolean; // final exam: "Currently on: Letter D"
  showOverallBar?: boolean; // final exam: overall progress bar
  initialIdx?: number;
  initialResults?: ExamAnswer[];
  onComplete: (results: ExamAnswer[]) => void;
  onPause?: (idx: number, results: ExamAnswer[]) => void;
  onBack: () => void;
}

export default function ExamRunner({
  items, title, color, showLetterSection, showOverallBar,
  initialIdx = 0, initialResults, onComplete, onPause, onBack,
}: ExamRunnerProps) {
  const [idx, setIdx] = useState(initialIdx);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(SECONDS);
  const [plays, setPlays] = useState(0);
  const resultsRef = useRef<ExamAnswer[]>(initialResults ? [...initialResults] : []);
  const answeredRef = useRef(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const item = items[idx];
  const word = item?.word ?? '';
  const total = items.length;

  const advance = (correct: boolean) => {
    if (answeredRef.current === idx) return; // one answer per word
    answeredRef.current = idx;
    resultsRef.current.push({ word, letter: item.letter, correct });
    if (idx + 1 < total) setIdx(idx + 1);
    else onComplete(resultsRef.current);
  };

  // New word: reset timer + input, speak once (counts as play 1), run countdown.
  useEffect(() => {
    setInput('');
    setTimeLeft(SECONDS);
    setPlays(1);
    playWord(word);
    inputRef.current?.focus();
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          playWrong();
          advance(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { clearInterval(id); stopWord(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const handleSubmit = () => {
    if (answeredRef.current === idx || !input.trim()) return;
    const correct = input.trim().toLowerCase() === word.toLowerCase();
    if (correct) playCorrect();
    else playWrong();
    advance(correct);
  };

  const replay = () => {
    if (plays >= MAX_PLAYS) return;
    playClick();
    playWord(word);
    setPlays((p) => p + 1);
  };

  const lowTime = timeLeft <= 10;

  return (
    <div className="relative z-10 max-w-xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <BackButton onClick={onBack} />
        {onPause && (
          <button
            onClick={() => { playClick(); onPause(idx, resultsRef.current); }}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-md font-extrabold text-[#FF9600] hover:brightness-95 transition cursor-pointer min-h-[44px]"
          >
            <Pause className="w-5 h-5" /> Pause
          </button>
        )}
      </div>

      <h1 className="text-xl sm:text-2xl font-black text-center" style={{ color }}>{title}</h1>
      <p className="text-center font-black text-gray-600 mt-1">Word {idx + 1} of {total}</p>
      {showLetterSection && (
        <p className="text-center font-bold text-gray-400 text-sm">Currently on: Letter {item?.letter}</p>
      )}
      {showOverallBar && <div className="mt-3"><ProgressBar value={(idx / total) * 100} color={color} /></div>}

      {/* 30s countdown bar */}
      <div className="mt-5 w-full h-4 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${(timeLeft / SECONDS) * 100}%`, backgroundColor: lowTime ? '#FF4B4B' : '#58CC02' }}
        />
      </div>
      <p className={`text-center font-black mt-1 ${lowTime ? 'text-[#FF4B4B]' : 'text-gray-400'}`}>{timeLeft}s</p>

      <div className="flex flex-col items-center mt-6">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={replay}
          disabled={plays >= MAX_PLAYS}
          className="w-20 h-20 rounded-full bg-[#1CB0F6] text-white flex items-center justify-center shadow-lg border-b-4 border-[#0f8abf] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          aria-label="Hear the word"
        >
          <Volume2 className="w-9 h-9" />
        </motion.button>
        <p className="mt-1.5 text-xs font-bold text-gray-400">Played {plays} / {MAX_PLAYS} times</p>

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Type the word…"
          className="mt-6 w-full text-center rounded-2xl px-5 py-4 font-black outline-none border-4 border-gray-200 bg-white text-gray-700 focus:border-[#1CB0F6]"
          style={{ fontSize: 40 }}
        />
        <button
          onClick={handleSubmit}
          className="btn-chunky w-full mt-5 px-8 py-4 text-white text-xl rounded-2xl shadow-lg hover:brightness-110 transition cursor-pointer"
          style={{ backgroundColor: color, borderBottom: `4px solid ${color}cc` }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
