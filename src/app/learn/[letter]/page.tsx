import { LearnContent } from '@/components/ClientLoader';

export function generateStaticParams() {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => ({ letter }));
}

export default function LearnPage() {
  return <LearnContent />;
}
