'use client';

// ===== WORD BANK FEATURE — screen orchestrator =====
// A single client-side state machine for the whole Word Bank flow:
//   category → letter → level → play → result → progress
// (kept as one route so it works with Next.js static export and gives
//  smooth in-app transitions). Each screen lives in components/wordbank/.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingParticles from '@/components/FloatingParticles';
import { getWordItems, wordText, type WordItem } from '@/lib/wordBank';
import {
  saveLevelProgress, getStars, addWrongWords, type LevelNum,
} from '@/lib/wordBankStorage';
import type { PlayResult, WBScreen } from '@/components/wordbank/types';
import CategorySelect from '@/components/wordbank/CategorySelect';
import LetterSelect from '@/components/wordbank/LetterSelect';
import LevelSelect from '@/components/wordbank/LevelSelect';
import Level1ListenSpell from '@/components/wordbank/Level1ListenSpell';
import Level2FillGaps from '@/components/wordbank/Level2FillGaps';
import Level3Jumbled from '@/components/wordbank/Level3Jumbled';
import ResultScreen from '@/components/wordbank/ResultScreen';
import WordBankProgress from '@/components/wordbank/WordBankProgress';

export default function WordBankContent() {
  const router = useRouter();
  const [screen, setScreen] = useState<WBScreen>('category');
  const [category, setCategory] = useState('');
  const [letter, setLetter] = useState('');
  const [level, setLevel] = useState<LevelNum>(1);
  const [playItems, setPlayItems] = useState<WordItem[]>([]);
  const [isRetry, setIsRetry] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const [result, setResult] = useState<PlayResult | null>(null);
  const [stars, setStars] = useState(0);

  const startPlay = (lvl: LevelNum, items: WordItem[], retry: boolean) => {
    setLevel(lvl);
    setPlayItems(items);
    setIsRetry(retry);
    setResult(null);
    setPlayKey((k) => k + 1);
    setScreen('play');
  };

  const handleComplete = (r: PlayResult) => {
    const wrong = r.results.filter((x) => !x.correct).map((x) => x.word);
    addWrongWords(category, wrong);
    const pct = r.total > 0 ? Math.round((r.score / r.total) * 100) : 0;
    // Retry sessions are practice — they never overwrite the saved level score.
    setStars(isRetry ? getStars(pct) : saveLevelProgress(category, letter, level, r.score, r.total, r.timeMs).stars);
    setResult(r);
    setScreen('result');
  };

  const retryWrong = (words: string[]) => {
    const set = new Set(words.map((w) => w.toLowerCase()));
    const items = getWordItems(category, letter).filter((it) => set.has(wordText(it).toLowerCase()));
    startPlay(level, items, true);
  };

  const renderPlay = () => {
    const props = { items: playItems, onComplete: handleComplete, onBack: () => setScreen('level') };
    if (level === 1) return <Level1ListenSpell {...props} />;
    if (level === 2) return <Level2FillGaps {...props} />;
    return <Level3Jumbled {...props} />;
  };

  const renderScreen = () => {
    switch (screen) {
      case 'category':
        return (
          <CategorySelect
            onPick={(c) => { setCategory(c); setScreen('letter'); }}
            onBack={() => router.push('/')}
            onProgress={() => setScreen('progress')}
          />
        );
      case 'letter':
        return (
          <LetterSelect
            category={category}
            onPick={(l) => { setLetter(l); setScreen('level'); }}
            onBack={() => setScreen('category')}
          />
        );
      case 'level':
        return (
          <LevelSelect
            category={category}
            letter={letter}
            onPick={(lvl) => startPlay(lvl, getWordItems(category, letter), false)}
            onBack={() => setScreen('letter')}
          />
        );
      case 'play':
        return renderPlay();
      case 'result':
        return result ? (
          <ResultScreen
            category={category}
            letter={letter}
            level={level}
            result={result}
            stars={stars}
            isRetry={isRetry}
            nextLevel={level < 3 ? ((level + 1) as LevelNum) : null}
            onRetryWrong={retryWrong}
            onNextLevel={() => startPlay((level + 1) as LevelNum, getWordItems(category, letter), false)}
            onBackToLetters={() => setScreen('letter')}
          />
        ) : null;
      case 'progress':
        return <WordBankProgress onBack={() => setScreen('category')} />;
    }
  };

  const animKey = screen === 'play' ? `play-${playKey}` : screen;

  return (
    <div className="min-h-screen pattern-bg relative">
      <FloatingParticles />
      <AnimatePresence mode="wait">
        <motion.div
          key={animKey}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
