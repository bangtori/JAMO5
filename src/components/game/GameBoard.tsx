import type { RowResult } from '../../types';
import Tile from '../ui/Tile';

interface GameBoardProps {
  prevRows: RowResult[];
  currentRow: string[];
}
export default function GameBoard({ prevRows, currentRow }: GameBoardProps) {
  return (
    <section className="flex flex-col gap-2">
      {/* 5줄 */}
      {Array.from({ length: 5 }, (_, rowIndex) => {
        if (rowIndex < prevRows.length) {
          // 제출 완료된 줄
          const tileData = prevRows[rowIndex];
          return (
            <div key={rowIndex} className="flex gap-2">
              {Array.from({ length: 5 }, (_, colIndex) => (
                <Tile
                  key={`${rowIndex}-${colIndex}`}
                  state={tileData[colIndex].state}
                  letter={tileData[colIndex].letter}
                />
              ))}
            </div>
          );
        } else if (rowIndex === prevRows.length) {
          // 현재 입력 중인 줄
          // currentRow 길이 만큼 state filled 채우고 바로 다음은 active 나머지는 empty
          return (
            <div key={rowIndex} className="flex gap-2">
              {Array.from({ length: 5 }, (_, colIndex) => {
                if (colIndex < currentRow.length) {
                  return (
                    <Tile
                      key={`${rowIndex}-${colIndex}`}
                      state={'filled'}
                      letter={currentRow[colIndex]}
                    />
                  );
                } else if (colIndex === currentRow.length) {
                  return (
                    <Tile key={`${rowIndex}-${colIndex}`} state={'active'} />
                  );
                } else {
                  return (
                    <Tile key={`${rowIndex}-${colIndex}`} state={'empty'} />
                  );
                }
              })}
            </div>
          );
        } else {
          // 빈 줄
          return (
            <div key={rowIndex} className="flex gap-2">
              {Array.from({ length: 5 }, (_, colIndex) => (
                <Tile key={`${rowIndex}-${colIndex}`} state={'empty'} />
              ))}
            </div>
          );
        }
      })}
    </section>
  );
}
