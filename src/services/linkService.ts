import type { TokenPayload, Word } from '../types';

export function generateToken(word: Word): string {
  const data = {
    word: word,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24시간
  } as TokenPayload;

  return btoa(encodeURIComponent(JSON.stringify(data)));
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    const decoded = decodeURIComponent(atob(token));
    const data = JSON.parse(decoded) as TokenPayload;
    if (data.expiresAt < Date.now()) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}
