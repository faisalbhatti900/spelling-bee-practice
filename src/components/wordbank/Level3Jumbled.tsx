'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { type WordItem, wordText } from '@/lib/wordBank';
import { playCorrect, playWrong, playClick, playWin } from '@/lib/sounds';
import { TILE_PALETTE, type PlayResult, type WordResult } from './types';
import Confetti from './Confetti';
import WordBankPlayHeader from './WordBankPlayHeader';
import { useLevelTimer } from './useLevelTimer';

interface Level3Props {
  items: WordItem[];
  onComplete: (result: PlayResult) => void;
  onBack: () => void;
}

interface Tile { id: number; ch: string; }

function colorFor(ch: string): string {
  return TILE_PALETTE[ch.toUpperCase().charCodeAt(0) % TILE_PALETTE.length];
}

function shuffleOrder(tiles: Tile[], word: string): number[] {
  const letters = word.replace(/\s/g, '');
  let ids = tiles.map((t) => t.id);
  if (letters.length < 2) return ids;
  for (let attempt = 0; attempt < 12; attempt++) {
    ids = [...tiles.map((t) => t.id)];
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    if (ids.map((id) => tiles[id].ch).join('') !== word) break;
  }
  return ids;
}

export default function Level3Jumbled({ items, onComplete, onBack }: Level3Props) {
  const [idx, setIdx] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [pool, setPool] = useState<number[]>([]);
  const [answer, setAnswer] = useState<number[]>([]);
  const [phase, setPhase] = useState<'input' | 'correct' | 'wrong'>('input');
  const [attempts, setAttempts] = useState(0);
  const [typed, setTyped] = useState('');
  const resultsRef = useRef<WordResult[]>([]);
  const { elapsedMs, stop } = useLevelTimer();

  const word = wordText(items[idx]);
  const total = items.length;
  const wordHasSpace = word.includes(' ');

  useEffect(() => {
    const t: Tile[] = word.split('').map((ch, i) => ({ id: i, ch }));
    setTiles(t);
    setPool(shuffleOrder(t, word));
    setAnswer([]);
    setPhase('input');
    setAttempts(0);
    setTyped('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const finishWord = (correct: boolean) => {
    resultsRef.current.push({ word, correct });
    if (idx + 1 < total) {
      setIdx(idx + 1);
    } else {
      const score = resultsRef.current.filter((r) => r.correct).length;
      onComplete({ score, total, results: resultsRef.current, timeMs: stop() });
    }
  };

  const succeed = (firstTry: boolean) => {
    setPhase('correct');
    playWin();
    playCorrect();
    setTimeout(() => finishWord(firstTry), 1600);
  };

  const fail = () => {
    setAttempts((a) => a + 1);
    setPhase('wrong');
    playWrong();
    setTimeout(() => {
      // bounce all tiles back to the jumbled pool
      setPool((p) => [...p, ...answer]);
      setAnswer([]);
      setPhase('input');
    }, 700);
  };

  const checkWord = (built: string) => {
    if (built.toLowerCase() === word.toLowerCase()) succeed(attempts === 0);
    else fail();
  };

  const placeTile = (id: number) => {
    if (phase !== 'input') return;
    playClick();
    const nextAnswer = [...answer, id];
    setAnswer(nextAnswer);
    setPool((p) => p.filter((x) => x !== id));
    if (nextAnswer.length === tiles.length) {
      const built = nextAnswer.map((tid) => tiles[tid].ch).join('');
      setTimeout(() => checkWord(built), 300);
    }
  };

  const returnTile = (id: number) => {
    if (phase !== 'input') return;
    playClick();
    setAnswer((a) => a.filter((x) => x !== id));
    setPool((p) => [...p, id]);
  };

  const submitTyped = () => {
    if (phase !== 'input' || !typed.trim()) return;
    checkWord(typed.trim());
  };

  const tileBox = (id: number, inAnswer: boolean) => {
    const t = tiles[id];
    if (!t) return null;
    return (
      <motion.button
        key={id}
        layoutId={`tile-${id}`}
        layout
        whileTap={{ scale: 0.9 }}
        onClick={() => (inAnswer ? returnTile(id) : placeTile(id))}
        disabled={phase === 'correct'}
        className={`flex items-center justify-center rounded-2xl font-black text-white shadow-md border-b-4 cursor-pointer
          ${phase === 'correct' && inAnswer ? 'animate-bounce-in' : ''}
          ${phase === 'wrong' && inAnswer ? 'animate-shake' : ''}`}
        style={{
          width: 56,
          height: 64,
          fontSize: 28,
          backgroundColor: phase === 'correct' && inAnswer ? '#58CC02' : colorFor(t.ch),
          borderBottomColor: phase === 'correct' && inAnswer ? '#46a302' : `${colorFor(t.ch)}cc`,
        }}
      >
        {t.ch.toUpperCase()}
      </motion.button>
    );
  };

  return (
    <div className="relative z-10 max-w-xl mx-auto px-4 py-6">
      {phase === 'correct' && <Confetti />}

      <WordBankPlayHeader idx={idx} total={total} color="#FF9600" elapsedMs={elapsedMs} onBack={onBack} />

      <p className="text-center text-gray-500 font-bold mt-6 mb-3">Tap the letters in the right order!</p>

      {/* Answer slots */}
      <div className="min-h-[72px] flex flex-wrap items-center justify-center gap-2 p-3 rounded-2xl bg-white/60 border-2 border-dashed border-gray-300">
        {answer.length === 0 && <span className="text-gray-300 font-bold">Your answer…</span>}
        {answer.map((id) => tileBox(id, true))}
      </div>

      {/* Letter pool */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 min-h-[72px]">
        {pool.map((id) => tileBox(id, false))}
      </div>

      {phase === 'correct' && (
        <p className="text-center mt-5 text-2xl font-black text-[#58CC02]">Amazing! You unscrambled it! 🎉</p>
      )}
      {phase === 'wrong' && (
        <p className="text-center mt-5 text-xl font-black text-[#FF4B4B]">Not quite! Try again 💪</p>
      )}

      {/* Type method (alternative) */}
      <div className="mt-8 border-t-2 border-gray-100 pt-5">
        <p className="text-center text-gray-400 font-bold text-sm mb-2">…or just type it:</p>
        <div className="flex gap-2">
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') submitTyped(); }}
            disabled={phase === 'correct'}
            autoCapitalize={wordHasSpace ? 'words' : 'off'}
            autoCorrect="off"
            spellCheck={false}
            placeholder="Type the word…"
            className="flex-1 rounded-2xl px-4 py-3 text-xl font-black text-center outline-none border-4 border-gray-200 bg-white focus:border-[#FF9600]"
          />
          <button
            onClick={submitTyped}
            className="btn-chunky px-6 py-3 bg-[#FF9600] text-white font-extrabold border-b-4 border-[#cc7800] rounded-2xl cursor-pointer"
          >
            Check
          </button>
        </div>
      </div>
    </div>
  );
}
