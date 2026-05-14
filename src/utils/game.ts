import type { RowResult } from '../types';

// 승패 판정
export function isGameWon(row: RowResult): boolean {
  return row.every((tile) => tile.state === 'correct');
}
