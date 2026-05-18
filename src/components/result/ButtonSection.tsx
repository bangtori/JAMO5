import Button from '../ui/Button';

interface ButtonSectionProps {
  onCopy: () => void;
  onPlayAgain: () => void;
}

export default function ButtonSection({
  onCopy,
  onPlayAgain,
}: ButtonSectionProps) {
  return (
    <section className="flex flex-col gap-2">
      <Button onClick={onCopy} size="lg">
        결과 복사하기
      </Button>
      <Button
        onClick={onPlayAgain}
        size="lg"
        appearance="outline"
        variant="neutral"
      >
        홈으로 돌아가기
      </Button>
    </section>
  );
}
