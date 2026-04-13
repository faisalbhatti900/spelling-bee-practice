'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star, Zap, CheckCircle, XCircle } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import { WORDS, CORRECT_MSGS, WRONG_MSGS } from '@/lib/words';
import { playCorrect, playWrong, playClick } from '@/lib/sounds';
import { shuffle, pick } from '@/lib/utils';
import { QuizResult, saveLetterScore } from '@/lib/storage';

interface Question {
  word: string;
  type: 'syn' | 'ant';
  correct: string;
  options: string[];
}

function generateQuestions(letter: string): Question[] {
  const words = WORDS[letter] || [];
  const questions: Question[] = [];

  words.forEach((w) => {
    const synCorrect = pick(w.syn);
    const synWrongPool = [...w.ant];
    words.forEach((ow) => {
      if (ow.word !== w.word) synWrongPool.push(...ow.ant.slice(0, 2));
    });
    const synOptions = [synCorrect];
    const synPool = shuffle(synWrongPool);
    while (synOptions.length < 4 && synPool.length) {
      const wr = synPool.pop()!;
      if (!synOptions.includes(wr)) synOptions.push(wr);
    }
    questions.push({ word: w.word, type: 'syn', correct: synCorrect, options: shuffle(synOptions) });

    const antCorrect = pick(w.ant);
    const antWrongPool = [...w.syn];
    words.forEach((ow) => {
      if (ow.word !== w.word) antWrongPool.push(...ow.syn.slice(0, 2));
    });
    const antOptions = [antCorrect];
    const antPool = shuffle(antWrongPool);
    while (antOptions.length < 4 && antPool.length) {
      const wr = antPool.pop()!;
      if (!antOptions.includes(wr)) antOptions.push(wr);
    }
    questions.push({ word: w.word, type: 'ant', correct: antCorrect, options: shuffle(antOptions) });
  });

  return shuffle(questions);
}

export default function QuizContent() {
  const router = useRouter();
  const params = useParams();
  const letter = (params.letter as string).toUpperCase();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [results, setResults] = useState<QuizResult[]>([]);
  const [floatStars, setFloatStars] = useState<{ id: number }[]>([]);

  const scoreRef = useRef(score);
  const resultsRef = useRef(results);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { resultsRef.current = results; }, [results]);

  useEffect(() => {
    setQuestions(generateQuestions(letter));
  }, [letter]);

  const q = questions[index];

  const handleAnswer = useCallback((answer: string) => {
    if (answered || !q) return;
    setAnswered(true);
    setSelectedAnswer(answer);

    const isCorrect = answer === q.correct;
    if (isCorrect) {
      playCorrect();
      setScore((s) => s + 1);
      setFeedback(pick(CORRECT_MSGS));
      setFloatStars((prev) => [...prev, { id: Date.now() }]);
      setTimeout(() => setFloatStars((prev) => prev.slice(1)), 900);
    } else {
      playWrong();
      setFeedback(pick(WRONG_MSGS));
    }

    setResults((prev) => [
      ...prev,
      { word: q.word, type: q.type, correct: isCorrect, answer, correctAnswer: q.correct },
    ]);
  }, [answered, q]);

  const handleNext = useCallback(() => {
    playClick();
    const currentScore = scoreRef.current;
    const currentResults = resultsRef.current;

    if (index >= questions.length - 1) {
      saveLetterScore(letter, currentScore, questions.length, currentResults);
      sessionStorage.setItem(
        `quiz-results-${letter}`,
        JSON.stringify({ score: currentScore, total: questions.length, results: currentResults })
      );
      router.push(`/results/${letter}`);
      return;
    }
    setIndex(index + 1);
    setAnswered(false);
    setSelectedAnswer(null);
    setFeedback('');
  }, [index, questions.length, letter, router]);

  if (!q) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🐝</div>
          <div className="w-12 h-12 border-4 border-[#CE82FF] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {floatStars.map((s) => (
        <div key={s.id} className="fixed top-1/3 left-1/2 -translate-x-1/2 text-3xl pointer-events-none z-50 animate-float-up">
          +1 ⭐
        </div>
      ))}

      <div className="sticky top-0 z-20 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => router.push('/home')} className="flex items-center gap-1 text-gray-500 font-bold hover:text-gray-700 cursor-pointer">
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <div className="flex items-center gap-2 font-extrabold text-lg">
              <Zap className="w-5 h-5 text-[#FF9600]" />
              <span className="text-[#FF9600]">Letter {letter}</span>
              <span className="text-gray-400">— Quiz</span>
            </div>
            <div className="flex items-center gap-1 font-black text-[#FFC800]">
              <Star className="w-5 h-5 fill-[#FFC800]" /> {score}
            </div>
          </div>
          <ProgressBar value={(index / questions.length) * 100} color="#1CB0F6" />
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.25 }}>
            <div className="text-center mb-6">
              <motion.h2 className="text-4xl sm:text-5xl font-black text-[#CE82FF] mb-2" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 0.5 }}>
                {q.word}
              </motion.h2>
              <p className="text-lg font-bold text-gray-400">
                {q.type === 'syn' ? (
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
              {q.options.map((opt, i) => {
                let bgClass = 'bg-white border-2 border-gray-200 border-b-4 border-b-gray-300 text-gray-700';
                let icon = null;
                if (answered) {
                  if (opt === q.correct) {
                    bgClass = 'bg-[#E8F9E0] border-2 border-[#58CC02] border-b-4 border-b-[#46a302] text-[#46a302]';
                    icon = <CheckCircle className="w-5 h-5 text-[#58CC02]" />;
                  } else if (opt === selectedAnswer && opt !== q.correct) {
                    bgClass = 'bg-[#FFE8E8] border-2 border-[#FF4B4B] border-b-4 border-b-[#d83b3b] text-[#d83b3b]';
                    icon = <XCircle className="w-5 h-5 text-[#FF4B4B]" />;
                  } else {
                    bgClass = 'bg-gray-50 border-2 border-gray-200 border-b-4 border-b-gray-200 text-gray-400';
                  }
                }
                return (
                  <motion.button
                    key={opt} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    whileHover={!answered ? { scale: 1.02 } : {}} whileTap={!answered ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(opt)} disabled={answered}
                    className={`w-full text-left px-6 py-4 rounded-2xl font-bold text-lg flex items-center justify-between gap-2 cursor-pointer transition-all duration-150 ${bgClass}
                      ${answered && opt === selectedAnswer && opt !== q.correct ? 'animate-shake' : ''}
                      ${answered && opt === q.correct ? 'animate-bounce-in' : ''}`}
                  >
                    <span>{opt}</span>
                    {icon}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {feedback && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className={`text-center text-xl font-extrabold mb-4 ${selectedAnswer === q.correct ? 'text-[#46a302]' : 'text-[#d83b3b]'}`}>
                  {feedback}
                </motion.div>
              )}
            </AnimatePresence>

            {answered && (
              <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="btn-chunky w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#58CC02] text-white font-extrabold text-lg border-b-4 border-[#46a302] rounded-2xl shadow-lg cursor-pointer">
                {index >= questions.length - 1 ? 'See Results' : 'Next'}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
