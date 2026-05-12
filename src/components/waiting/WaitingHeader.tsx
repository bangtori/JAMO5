import CapsuleBadge from '../ui/CapsuleBadge';
import Tile from '../ui/Tile';

interface WaitingHeaderProps {
  isLinkMode?: boolean;
}

export default function WaitingHeader({ isLinkMode }: WaitingHeaderProps) {
  return (
    <section className="flex flex-col items-center gap-10">
      {isLinkMode && (
        <CapsuleBadge size="md" variant="accent">
          링크로 초대됨
        </CapsuleBadge>
      )}
      <h1 className="font-title text-4xl text-center">
        JAMO
        <span className="text-accent text-5xl">5</span>
      </h1>
      <div className="flex flex-col text-center gap-1 text-text-muted text-sm">
        <p>자모 5개짜리 단어를</p>
        <p>5번 안에 맞춰보세요</p>
      </div>
      {/* 장식용 타일 — 실제 판정 결과 아님 */}
      <div className="flex items-center gap-3">
        <Tile state="absent" letter="?" />
        <Tile state="absent" letter="?" />
        <Tile state="absent" letter="?" />
        <Tile state="absent" letter="?" />
        <Tile state="absent" letter="?" />
      </div>
    </section>
  );
}
