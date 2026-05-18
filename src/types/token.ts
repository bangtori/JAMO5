import type { Word } from './word';

export interface TokenPayload {
  word: Word;
  expiresAt: number;
}
