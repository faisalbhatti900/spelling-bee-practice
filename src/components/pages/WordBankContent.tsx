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
import { primeSpeech, isSpeechAvailable } from '@/lib/speech';
import { getWordItems, getWords, wordText, type WordItem } from '@/lib/wordBank';
import {
  saveLevelProgress, getStars, addWrongWords, type LevelNum,
} from '@/lib/wordBankStorage';
import {
  saveLetterExam, saveFinalResult, getFinalProgress, saveFinalProgress, clearFinalProgress,
  lettersWithWords, type ExamItem, type ExamAnswer,
} from '@/lib/examStorage';
import type { PlayResult, WBScreen } from '@/components/wordbank/types';
import CategorySelect from '@/components/wordbank/CategorySelect';
import LetterSelect from '@/components/wordbank/LetterSelect';
import LevelSelect from '@/components/wordbank/LevelSelect';
import Level1ListenSpell from '@/components/wordbank/Level1ListenSpell';
import Level2FillGaps from '@/components/wordbank/Level2FillGaps';
import Level3Jumbled from '@/components/wordbank/Level3Jumbled';
import ResultScreen from '@/components/wordbank/ResultScreen';
import WordBankProgress from '@/components/wordbank/WordBankProgress';
import ExamRunner from '@/components/wordbank/ExamRunner';
import ExamResult from '@/components/wordbank/ExamResult';
import FinalExamResult from '@/components/wordbank/FinalExamResult';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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
  const [soundPrimed, setSoundPrimed] = useState(false);

  // ===== EXAMS FEATURE — state =====
  const [examMode, setExamMode] = useState<'letter' | 'final'>('letter');
  const [examItems, setExamItems] = useState<ExamItem[]>([]);
  const [examResume, setExamResume] = useState<{ idx: number; results: ExamAnswer[] } | null>(null);
  const [examAnswers, setExamAnswers] = useState<ExamAnswer[]>([]);
  const [examStars, setExamStars] = useState(0);
  const [examKey, setExamKey] = useState(0);

  // iOS only allows speech after a user gesture — prime it on the first tap.
  const handleFirstTap = () => {
    if (soundPrimed) return;
    primeSpeech();
    setSoundPrimed(true);
  };

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

  // ===== EXAMS FEATURE — flow =====
  const startLetterExam = () => {
    setExamItems(getWords(category, letter).map((w) => ({ word: w, letter })));
    setExamResume(null);
    setExamMode('letter');
    setExamKey((k) => k + 1);
    setScreen('letterExam');
  };

  const buildFinalItems = (letters: string[]): ExamItem[] => {
    const items: ExamItem[] = [];
    letters.forEach((l) => getWords(category, l).forEach((w) => items.push({ word: w, letter: l })));
    return shuffle(items);
  };

  const startFinalExam = () => {
    const prog = getFinalProgress(category);
    if (prog && prog.order?.length) {
      setExamItems(prog.order);
      setExamResume({ idx: prog.idx, results: prog.results });
    } else {
      setExamItems(buildFinalItems(lettersWithWords(category)));
      setExamResume(null);
    }
    setExamMode('final');
    setExamKey((k) => k + 1);
    setScreen('finalExam');
  };

  const startFinalFresh = (letters: string[]) => {
    clearFinalProgress(category);
    setExamItems(buildFinalItems(letters));
    setExamResume(null);
    setExamMode('final');
    setExamKey((k) => k + 1);
    setScreen('finalExam');
  };

  const handleExamComplete = (answers: ExamAnswer[]) => {
    const score = answers.filter((a) => a.correct).length;
    const total = answers.length;
    setExamAnswers(answers);
    if (examMode === 'letter') {
      setExamStars(saveLetterExam(category, letter, score, total).stars);
      setScreen('examResult');
    } else {
      const perLetter: Record<string, { score: number; total: number }> = {};
      answers.forEach((a) => {
        if (!perLetter[a.letter]) perLetter[a.letter] = { score: 0, total: 0 };
        perLetter[a.letter].total += 1;
        if (a.correct) perLetter[a.letter].score += 1;
      });
      setExamStars(saveFinalResult(category, { score, total, perLetter }).stars);
      clearFinalProgress(category);
      setScreen('finalResult');
    }
  };

  const handleExamPause = (idx: number, results: ExamAnswer[]) => {
    saveFinalProgress(category, { order: examItems, idx, results });
    setScreen('letter');
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
            onFinalExam={startFinalExam}
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
            onLetterExam={startLetterExam}
          />
        ) : null;
      case 'progress':
        return <WordBankProgress onBack={() => setScreen('category')} />;
      case 'letterExam':
        return (
          <ExamRunner
            items={examItems}
            title={`Letter ${letter} Exam — ${category}`}
            color="#1CB0F6"
            onComplete={handleExamComplete}
            onBack={() => setScreen('level')}
          />
        );
      case 'examResult':
        return (
          <ExamResult
            category={category}
            letter={letter}
            answers={examAnswers}
            stars={examStars}
            onRetry={startLetterExam}
            onBack={() => setScreen('letter')}
          />
        );
      case 'finalExam':
        return (
          <ExamRunner
            items={examItems}
            title={`Final Exam — ${category}`}
            color="#FF9600"
            showLetterSection
            showOverallBar
            initialIdx={examResume?.idx ?? 0}
            initialResults={examResume?.results}
            onComplete={handleExamComplete}
            onPause={handleExamPause}
            onBack={() => setScreen('letter')}
          />
        );
      case 'finalResult':
        return (
          <FinalExamResult
            category={category}
            answers={examAnswers}
            stars={examStars}
            onRetryFull={() => startFinalFresh(lettersWithWords(category))}
            onRetryWeak={(weak) => startFinalFresh(weak)}
            onBack={() => setScreen('letter')}
          />
        );
    }
  };

  const animKey =
    screen === 'play' ? `play-${playKey}`
      : screen === 'letterExam' || screen === 'finalExam' ? `exam-${examKey}`
        : screen;

  return (
    <div className="min-h-screen pattern-bg relative" onPointerDownCapture={handleFirstTap}>
      <FloatingParticles />

      {!soundPrimed && isSpeechAvailable() && (
        <div className="pointer-events-none fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-gray-800/90 text-white text-sm font-bold shadow-lg">
          🔊 Tap anywhere to enable sound
        </div>
      )}

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
