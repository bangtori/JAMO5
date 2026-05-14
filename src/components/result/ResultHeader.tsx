import type { GameStatus } from '../../types';

interface ResultHeaderProps {
  tryCount: number;
  result: GameStatus;
  playTime: string;
}

export default function ResultHeader({
  tryCount,
  result,
  playTime,
}: ResultHeaderProps) {
  return (
    <section className="flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold text-text font-title">
        {result === 'won' ? (
          <>
            도전에 <span className="text-correct">성공</span>했습니다!
          </>
        ) : (
          <>
            아쉽네요, <span className="text-danger">실패</span>했습니다.
          </>
        )}
      </h1>
      <div className="flex gap-8 items-center">
        <div className="flex flex-col items-center gap-1">
          <p className="text-2xl font-bold text-accent font-mono">
            {tryCount} / 5
          </p>
          <p className="text-text-muted text-sm">시도 횟수</p>
        </div>
        <div className="w-px self-stretch bg-border" />
        <div className="flex flex-col items-center gap-1">
          <p className="text-2xl font-bold text-accent font-mono">{playTime}</p>
          <p className="text-text-muted text-sm">소요 시간</p>
        </div>
      </div>
    </section>
  );
}
