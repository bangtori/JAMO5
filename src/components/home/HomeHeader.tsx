import Tile from '../ui/Tile';
import GameTitle from '../ui/GameTitle';

export default function HomeHeader() {
  return (
    <section className="flex flex-col items-center gap-4">
      <GameTitle />
      {/* 장식용 타일 — 실제 판정 결과 아님 */}
      <div className="flex items-center gap-3">
        <Tile state="correct" letter="ㅈ" />
        <Tile state="absent" letter="ㅏ" />
        <Tile state="present" letter="ㅁ" />
        <Tile state="correct" letter="ㅗ" />
        <Tile state="absent" letter="5" />
      </div>
    </section>
  );
}
