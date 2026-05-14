import { CircleQuestionMark } from 'lucide-react';
import Button from '../ui/Button';
import CapsuleBadge from '../ui/CapsuleBadge';
import GameTitle from '../ui/GameTitle';

export default function GameHeader({
  tryCount,
  onOpenHowToPlayModal,
  playTime,
}: {
  tryCount: number;
  onOpenHowToPlayModal: () => void;
  playTime: string;
}) {
  return (
    <section className="flex flex-col gap-5 items-center">
      <GameTitle />
      <div className="flex gap-2 items-center">
        <CapsuleBadge size="lg" variant="neutral" className="gap-1">
          시도 <span className="font-bold text-accent">{tryCount}</span> / 5
        </CapsuleBadge>
        <Button
          variant="neutral"
          appearance="ghost"
          size="sm"
          onClick={onOpenHowToPlayModal}
          icon={<CircleQuestionMark />}
        />
      </div>
      <div className="flex gap-4 items-center">
        <p className="text-text-muted">소요 시간</p>
        <p className="text-xl font-bold">{playTime}</p>
      </div>
    </section>
  );
}
