import type { GameResult, RowResult } from '../types';

// 승패 판정
export function isGameWon(row: RowResult): boolean {
  return row.every((tile) => tile.state === 'correct');
}

export function copyResultToClipboard(
  result: GameResult,
  playTime: string,
): string {
  const { board, gameStatus } = result;
  return `JAMO5 게임 결과
결과: ${gameStatus === 'won' ? '성공 🎉' : '실패 😭'}
소요 시간: ${playTime}
시도: ${board.length} / 5
${board
  .map((row) =>
    row
      .map((tile) => {
        if (tile.state === 'correct') return '🟩';
        if (tile.state === 'present') return '🟨';
        return '⬛️';
      })
      .join(''),
  )
  .join('\n')}`;
}
