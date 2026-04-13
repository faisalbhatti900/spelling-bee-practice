'use client';

import dynamic from 'next/dynamic';

export const LandingContent = dynamic(() => import('@/components/pages/LandingContent'), { ssr: false });
export const HomeContent = dynamic(() => import('@/components/pages/HomeContent'), { ssr: false });
export const LearnContent = dynamic(() => import('@/components/pages/LearnContent'), { ssr: false });
export const QuizContent = dynamic(() => import('@/components/pages/QuizContent'), { ssr: false });
export const ResultsContent = dynamic(() => import('@/components/pages/ResultsContent'), { ssr: false });
export const ProgressContent = dynamic(() => import('@/components/pages/ProgressContent'), { ssr: false });
export const FinalTestContent = dynamic(() => import('@/components/pages/FinalTestContent'), { ssr: false });
