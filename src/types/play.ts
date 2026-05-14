export type TileState =
  | 'correct' // 초록 - 해당 자모가 정답에 있음 & 위치도 맞음
  | 'present' // 노랑 - 해당 자모가 정답에 있음 & 위치는 다름
  | 'absent'; // 회색 - 해당 자모가 정답에 없음

// 타일 1개 입력 현황
export interface TileResult {
  letter: string;
  state: TileState;
}

export type TileDisplayState =
  | 'empty' // 비어있음
  | 'active' // 현재 입력 위치
  | 'filled' // 입력됐지만 미제출
  | TileState;

// 게임판 1줄 입력 결과
export type RowResult = TileResult[];

// 게임 판 전체 결과
export type BoardResult = RowResult[];

// 게임 진행 상태
export type GameStatus =
  | 'playing' // 입력 중
  | 'won' // 정답 맞춤
  | 'lost'; // 시도 횟수 초과

// 게임 도전 현황
export type TryInfo =
  | { isPlayed: false }
  | { isPlayed: true; result: 'won'; attempts: number }
  | { isPlayed: true; result: 'lost' };

// 게임 결과
export interface GameResult {
  gameStatus: GameStatus;
  board: BoardResult;
}
