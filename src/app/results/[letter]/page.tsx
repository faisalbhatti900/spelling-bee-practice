import { ResultsContent } from '@/components/ClientLoader';

export function generateStaticParams() {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => ({ letter }));
}

export default function ResultsPage() {
  return <ResultsContent />;
}
