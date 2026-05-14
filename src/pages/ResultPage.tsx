import { useLocation } from 'react-router-dom';
import PageLayout from '../components/ui/PageLayout';
import type { GameResult, Word } from '../types';

interface ResultState {
  result: GameResult;
  answer: Word;
}

export default function ResultPage() {
  const { state } = useLocation();
  const { result, answer } = state as ResultState;

  return (
    <PageLayout>
      <h1 className="font-title text-4xl text-center">결과</h1>
      <p>{result.gameStatus === 'won' ? '성공!' : '실패!'}</p>
      <p>제시어: {answer.word}</p>
    </PageLayout>
  );
}
