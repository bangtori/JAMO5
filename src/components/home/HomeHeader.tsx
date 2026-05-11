import Tile from '../ui/Tile';

export default function HomeHeader() {
  return (
    <section className="flex flex-col items-center gap-4">
      <h1 className="font-title text-4xl text-center">
        JAMO
        <span className="text-accent text-5xl">5</span>
      </h1>
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
