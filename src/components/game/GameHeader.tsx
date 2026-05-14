import { CircleQuestionMark } from 'lucide-react';
import Button from '../ui/Button';
import CapsuleBadge from '../ui/CapsuleBadge';
import GameTitle from '../ui/GameTitle';

export default function GameHeader({
  tryCount,
  onOpenHowToPlayModal,
}: {
  tryCount: number;
  onOpenHowToPlayModal: () => void;
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
    </section>
  );
}
