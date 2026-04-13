import { QuizContent } from '@/components/ClientLoader';

export function generateStaticParams() {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => ({ letter }));
}

export default function QuizPage() {
  return <QuizContent />;
}
