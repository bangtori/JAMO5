import type { Word } from '../../types';
import Card from '../ui/Card';

export default function AnswerSection({ answer }: { answer: Word }) {
  return (
    <Card>
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col text-text-muted text-sm">
          <p>제시어</p>
          <p>{answer.letters.join(' · ')}</p>
        </div>
        <p className="text-accent text-2xl font-bold font-title">
          {answer.word}
        </p>
      </div>
    </Card>
  );
}
