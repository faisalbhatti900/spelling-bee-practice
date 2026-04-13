'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Timer, Trophy, Star, CheckCircle, XCircle, Home, RotateCcw } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import { WORDS, LETTERS, CORRECT_MSGS, WRONG_MSGS } from '@/lib/words';
import { playCorrect, playWrong, playClick, playWin, playLose } from '@/lib/sounds';
import { shuffle, pick } from '@/lib/utils';
import { getStarCount } from '@/lib/storage';
import confetti from 'canvas-confetti';

interface Question {
  word: string;
  letter: string;
  type: 'syn' | 'ant';
  correct: string;
  options: string[];
}

function generateFinalQuestions(): Question[] {
  const questions: Question[] = [];
  LETTERS.forEach((l) => {
    const words = WORDS[l];
    const w = pick(words);
    const isSyn = Math.random() > 0.5;
    const type = isSyn ? 'syn' : 'ant';
    const correct = pick(isSyn ? w.syn : w.ant);
    const wrongPool = isSyn ? [...w.ant] : [...w.syn];
    words.forEach((ow) => {
      if (ow.word !== w.word) wrongPool.push(...(isSyn ? ow.ant : ow.syn).slice(0, 2));
    });
    const options = [correct];
    const pool = shuffle(wrongPool);
    while (options.length < 4 && pool.length) {
      const wr = pool.pop()!;
      if (!options.includes(wr)) options.push(wr);
    }
    questions.push({ word: w.word, letter: l, type: type as 'syn' | 'ant', correct, options: shuffle(options) });
  });
  return shuffle(questions);
}

interface Result { word: string; correct: boolean; type: 'syn' | 'ant'; }

export default function FinalTestContent() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResults, setShowResults] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const answeredRef = useRef(false);

  useEffect(() => { answeredRef.current = answered; }, [answered]);
  useEffect(() => { setQuestions(generateFinalQuestions()); }, []);

  useEffect(() => {
    if (showResults || !questions.length) return;
    if (timerRef.current) clearInterval(timerRef.current);
    if (answered) return;
    setTimeLeft(30);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0.1) {
          if (timerRef.current) clearInterval(timerRef.current);
          if (!answeredRef.current) {
            answeredRef.current = true;
            setAnswered(true);
            setSelectedAnswer(null);
            playWrong();
            setFeedback("Time's up! ⏰");
            setResults((prev) => {
              const q = questions[index];
              return q ? [...prev, { word: q.word, correct: false, type: q.type }] : prev;
            });
          }
          return 0;
        }
        return t - 0.1;
      });
    }, 100);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [index, questions, showResults, answered]);

  const q = questions[index];

  const handleAnswer = (answer: string) => {
    if (answered || !q) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setAnswered(true);
    answeredRef.current = true;
    setSelectedAnswer(answer);
    const isCorrect = answer === q.correct;
    if (isCorrect) { playCorrect(); setScore((s) => s + 1); setFeedback(pick(CORRECT_MSGS)); }
    else { playWrong(); setFeedback(pick(WRONG_MSGS)); }
    setResults((prev) => [...prev, { word: q.word, correct: isCorrect, type: q.type }]);
  };

  const handleNext = () => {
    playClick();
    if (index >= questions.length - 1) {
      setShowResults(true);
      setTimeout(() => {
        if (score >= 20) {
          playWin();
          const end = Date.now() + 3000;
          const colors = ['#CE82FF', '#1CB0F6', '#FF9600', '#58CC02', '#FF4B4B', '#FFC800'];
          (function frame() {
            confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors });
            confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors });
            if (Date.now() < end) requestAnimationFrame(frame);
          })();
        } else { playLose(); }
      }, 200);
      return;
    }
    setIndex(index + 1);
    setAnswered(false);
    answeredRef.current = false;
    setSelectedAnswer(null);
    setFeedback('');
  };

  if (!q && !showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🐝</div>
          <div className="w-12 h-12 border-4 border-[#CE82FF] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (showResults) {
    const pct = Math.round((score / 26) * 100);
    const stars = getStarCount(pct);
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <div className="max-w-xl mx-auto px-4 py-8 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="text-8xl mb-4">
            {score >= 20 ? '🏆' : score >= 15 ? '🌟' : '💪'}
          </motion.div>
          <div className="flex justify-center gap-3 mb-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <motion.div key={s} initial={{ scale: 0, rotate: -20 }}
                animate={s <= stars ? { scale: 1, rotate: 0 } : { scale: 1, rotate: 0, opacity: 0.2 }}
                transition={{ delay: 0.3 + s * 0.2, type: 'spring' }} className="text-5xl">⭐</motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div className="text-6xl font-black text-[#CE82FF]">{score} / 26</div>
            <div className="text-2xl font-extrabold text-gray-400 mt-1">{pct}%</div>
            <div className="text-xl font-extrabold text-[#FF9600] mt-2">
              {score >= 24 ? "INCREDIBLE! You're a true Spelling Bee Champion! 🐝👑" :
                score >= 20 ? "Amazing performance! You crushed it! 🎉" :
                  score >= 15 ? "Great job! You know your words! 🌟" : "Keep practising! You'll get there! 💪"}
            </div>
          </motion.div>
          <div className="flex gap-2 overflow-x-auto py-4 mt-4">
            {results.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.03 }}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm ${r.correct ? 'bg-[#E8F9E0] text-[#46a302]' : 'bg-[#FFE8E8] text-[#d83b3b]'}`}>
                {r.correct ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                {r.word}
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <button onClick={() => { setShowResults(false); setQuestions(generateFinalQuestions()); setIndex(0); setScore(0); setAnswered(false); answeredRef.current = false; setSelectedAnswer(null); setFeedback(''); setResults([]); }}
              className="btn-chunky w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#FF9600] text-white font-extrabold text-lg border-b-4 border-[#cc7800] rounded-2xl cursor-pointer">
              <RotateCcw className="w-5 h-5" /> Try Again
            </button>
            <button onClick={() => router.push('/home')}
              className="btn-chunky w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-600 font-extrabold text-lg border-2 border-gray-200 border-b-4 border-b-gray-300 rounded-2xl cursor-pointer">
              <Home className="w-5 h-5" /> Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const timerPct = (timeLeft / 30) * 100;

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="sticky top-0 z-20 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => { if (confirm('Leave the test? Your progress will be lost.')) router.push('/home'); }}
              className="flex items-center gap-1 text-gray-500 font-bold cursor-pointer">
              <ArrowLeft className="w-5 h-5" /> Quit
            </button>
            <div className="flex items-center gap-2 font-extrabold text-lg">
              <Trophy className="w-5 h-5 text-[#FFC800]" /><span className="text-[#FFC800]">Final Test</span>
            </div>
            <div className="flex items-center gap-1 font-black text-[#FFC800]">
              <Star className="w-5 h-5 fill-[#FFC800]" /> {score}
            </div>
          </div>
          <ProgressBar value={(index / questions.length) * 100} color="#FF9600" />
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <Timer className={`w-5 h-5 ${timeLeft < 10 ? 'text-[#FF4B4B]' : 'text-[#FF9600]'}`} />
          <div className="flex-1"><ProgressBar value={timerPct} color={timeLeft < 10 ? '#FF4B4B' : '#FF9600'} height={8} showGlow={false} /></div>
          <span className={`font-black text-sm ${timeLeft < 10 ? 'text-[#FF4B4B]' : 'text-gray-400'}`}>{Math.ceil(timeLeft)}s</span>
        </div>
        <div className="text-center text-sm font-bold text-gray-400 mb-4">Question {index + 1} of {questions.length}</div>

        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}>
            <div className="text-center mb-6">
              <h2 className="text-4xl font-black text-[#CE82FF] mb-2">{q!.word}</h2>
              <p className="text-lg font-bold text-gray-400">
                {q!.type === 'syn' ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#58CC02]" />
                    Which means the <span className="text-[#58CC02] font-extrabold">SAME</span>?
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <XCircle className="w-5 h-5 text-[#FF4B4B]" />
                    Which is the <span className="text-[#FF4B4B] font-extrabold">OPPOSITE</span>?
                  </span>
                )}
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              {q!.options.map((opt, i) => {
                let bgClass = 'bg-white border-2 border-gray-200 border-b-4 border-b-gray-300 text-gray-700';
                let icon = null;
                if (answered) {
                  if (opt === q!.correct) {
                    bgClass = 'bg-[#E8F9E0] border-2 border-[#58CC02] border-b-4 border-b-[#46a302] text-[#46a302]';
                    icon = <CheckCircle className="w-5 h-5 text-[#58CC02]" />;
                  } else if (opt === selectedAnswer && opt !== q!.correct) {
                    bgClass = 'bg-[#FFE8E8] border-2 border-[#FF4B4B] border-b-4 border-b-[#d83b3b] text-[#d83b3b]';
                    icon = <XCircle className="w-5 h-5 text-[#FF4B4B]" />;
                  } else {
                    bgClass = 'bg-gray-50 border-2 border-gray-200 border-b-4 border-b-gray-200 text-gray-400';
                  }
                }
                return (
                  <motion.button key={opt} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    whileHover={!answered ? { scale: 1.02 } : {}} whileTap={!answered ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(opt)} disabled={answered}
                    className={`w-full text-left px-6 py-4 rounded-2xl font-bold text-lg flex items-center justify-between gap-2 cursor-pointer transition-all ${bgClass}
                      ${answered && opt === selectedAnswer && opt !== q!.correct ? 'animate-shake' : ''}
                      ${answered && opt === q!.correct ? 'animate-bounce-in' : ''}`}>
                    <span>{opt}</span>{icon}
                  </motion.button>
                );
              })}
            </div>

            {feedback && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`text-center text-xl font-extrabold mb-4 ${selectedAnswer === q!.correct ? 'text-[#46a302]' : 'text-[#d83b3b]'}`}>
                {feedback}
              </motion.div>
            )}

            {answered && (
              <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.95 }} onClick={handleNext}
                className="btn-chunky w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#58CC02] text-white font-extrabold text-lg border-b-4 border-[#46a302] rounded-2xl shadow-lg cursor-pointer">
                {index >= questions.length - 1 ? 'See Results' : 'Next'}<ArrowRight className="w-5 h-5" />
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
