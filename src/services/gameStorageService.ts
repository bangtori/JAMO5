import type { TryInfo } from '../types';

const KEY_PREFIX = 'jamo5_game_';

function getKey(token: string) {
  return `${KEY_PREFIX}${token}`;
}

// 게임 시작
export function saveGameEntry(token: string) {
  if (localStorage.getItem(getKey(token))) return;
  const startData: TryInfo = {
    isPlayed: true,
    result: 'lost',
  };
  localStorage.setItem(getKey(token), JSON.stringify(startData));
}

// 게임 완료 시 결과로 업데이트
export function saveGameResult(token: string, tryInfo: TryInfo) {
  localStorage.setItem(getKey(token), JSON.stringify(tryInfo));
}

// 게임 시도 있는지 읽기
export function getTryInfo(token: string): TryInfo | null {
  const stored = localStorage.getItem(getKey(token));
  if (!stored) return null;

  try {
    return JSON.parse(stored) as TryInfo;
  } catch {
    console.error('Failed to parse stored game data');
    return null;
  }
}
