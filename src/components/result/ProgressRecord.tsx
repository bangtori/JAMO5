import type { BoardResult } from '../../types';
import Card from '../ui/Card';
import Tile from '../ui/Tile';

export default function ProgressRecord({ board }: { board: BoardResult }) {
  return (
    <Card>
      <h3 className="text-text-muted text-xs mb-5">진행 기록</h3>
      <section className="flex flex-col gap-3">
        {board.map((row, index) => (
          <div key={index} className="flex items-center gap-10">
            <p className="text-xs w-10 text-text-muted">{index + 1} 회</p>
            <div className="flex gap-2">
              {row.map((tile, tIndex) => (
                <Tile key={tIndex} state={tile.state} letter={tile.letter} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </Card>
  );
}
