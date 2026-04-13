'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Repeat } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import { WORDS, LETTERS, LETTER_EMOJI } from '@/lib/words';
import { playClick, playLevelUp } from '@/lib/sounds';

export default function LearnContent() {
  const router = useRouter();
  const params = useParams();
  const letter = (params.letter as string).toUpperCase();
  const words = WORDS[letter] || [];
  const letterIdx = LETTERS.indexOf(letter);
  const emoji = LETTER_EMOJI[letterIdx] || '📖';

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const word = words[index];

  const handleNext = () => {
    playClick();
    if (index >= words.length - 1) {
      playLevelUp();
      router.push(`/quiz/${letter}`);
      return;
    }
    setDirection(1);
    setIndex(index + 1);
  };

  if (!word) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <p className="text-gray-400 font-bold">No words found for letter {letter}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] relative">
      <div className="sticky top-0 z-20 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => router.push('/home')}
              className="flex items-center gap-1 text-gray-500 font-bold hover:text-gray-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <div className="flex items-center gap-2 font-extrabold text-lg">
              <BookOpen className="w-5 h-5 text-[#CE82FF]" />
              <span className="text-[#CE82FF]">Letter {letter}</span>
              <span className="text-gray-400">— Learn</span>
            </div>
            <span className="font-black text-gray-400 text-sm">
              {index + 1}/{words.length}
            </span>
          </div>
          <ProgressBar value={((index + 1) / words.length) * 100} color="#58CC02" />
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -80 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100"
          >
            <div className="text-center mb-8">
              <span className="text-5xl mb-3 block">{emoji}</span>
              <h2 className="text-4xl sm:text-5xl font-black text-[#CE82FF] tracking-tight">
                {word.word}
              </h2>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#E8F9E0] flex items-center justify-center text-lg">✅</div>
                <h3 className="font-extrabold text-[#46a302]">Same meaning (Synonyms)</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {word.syn.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="px-4 py-2 rounded-xl bg-[#E8F9E0] text-[#46a302] font-bold text-base border-2 border-[#58CC02]/20"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFE8E8] flex items-center justify-center text-lg">↔️</div>
                <h3 className="font-extrabold text-[#d83b3b]">Opposite meaning (Antonyms)</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {word.ant.map((a, i) => (
                  <motion.span
                    key={a}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="px-4 py-2 rounded-xl bg-[#FFE8E8] text-[#d83b3b] font-bold text-base border-2 border-[#FF4B4B]/20"
                  >
                    {a}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-6">
          {index > 0 && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => { playClick(); setDirection(-1); setIndex(index - 1); }}
              className="btn-chunky flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-600 font-extrabold border-2 border-gray-200 border-b-4 border-b-gray-300 rounded-2xl cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="btn-chunky flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#58CC02] text-white font-extrabold text-lg border-b-4 border-[#46a302] rounded-2xl shadow-lg cursor-pointer"
          >
            {index >= words.length - 1 ? (
              <>Start Quiz! <Repeat className="w-5 h-5" /></>
            ) : (
              <>Got it! Next <ArrowRight className="w-5 h-5" /></>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
