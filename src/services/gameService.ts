import type { RowResult } from '../types';

export function calculateRowResult(
  answer: string[],
  guess: string[],
): RowResult {
  const tempAnswer = [...answer];
  const result: RowResult = [];

  // 1. correct 만 판정
  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === guess[i]) {
      result.push({ letter: guess[i], state: 'correct' });
      tempAnswer[i] = '';
    } else {
      result.push({ letter: guess[i], state: 'absent' });
    }
  }

  // 2. correct 제외 나머지 present 판정
  for (let i = 0; i < answer.length; i++) {
    if (result[i].state === 'absent' && tempAnswer.includes(guess[i])) {
      result[i].state = 'present';
      tempAnswer[tempAnswer.indexOf(guess[i])] = '';
    }
  }

  return result;
}
