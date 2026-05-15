const CHOSUNG = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
] as const;

const JUNGSUNG = [
  'ㅏ',
  'ㅐ',
  'ㅑ',
  'ㅒ',
  'ㅓ',
  'ㅔ',
  'ㅕ',
  'ㅖ',
  'ㅗ',
  'ㅘ',
  'ㅙ',
  'ㅚ',
  'ㅛ',
  'ㅜ',
  'ㅝ',
  'ㅞ',
  'ㅟ',
  'ㅠ',
  'ㅡ',
  'ㅢ',
  'ㅣ',
] as const;

const JONGSUNG = [
  '',
  'ㄱ',
  'ㄲ',
  'ㄳ',
  'ㄴ',
  'ㄵ',
  'ㄶ',
  'ㄷ',
  'ㄹ',
  'ㄺ',
  'ㄻ',
  'ㄼ',
  'ㄽ',
  'ㄾ',
  'ㄿ',
  'ㅀ',
  'ㅁ',
  'ㅂ',
  'ㅄ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
] as const;

function isHangul(c: string): boolean {
  const code = c.charCodeAt(0);
  return code >= 0xac00 && code <= 0xd7a3;
}

function splitJamo(c: string): string[] {
  if (!isHangul(c)) {
    return [];
  }

  const code = c.charCodeAt(0) - 0xac00;
  const jong = code % 28;
  const jung = ((code - jong) / 28) % 21;
  const cho = Math.floor(code / 28 / 21);

  const result: string[] = [];
  result.push(CHOSUNG[cho]);
  result.push(JUNGSUNG[jung]);
  if (jong > 0) {
    result.push(JONGSUNG[jong]);
  }
  return result;
}

export function splitWordToJam(word: string) {
  const result: string[] = [];
  for (const char of word) {
    result.push(...splitJamo(char));
  }
  return result;
}

const COMPLEX_VOWELS = ['ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ'];

export function isValidForGame(jamos: string[]): boolean {
  // 자모 5개인지
  if (jamos.length !== 5) return false;
  // 복합 모음 없는지
  if (jamos.some((jamo) => COMPLEX_VOWELS.includes(jamo))) return false;
  return true;
}
