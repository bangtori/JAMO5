import fs from 'fs';

// 복합 모음 목록
const COMPLEX_VOWELS = ['ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ'];
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
];

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
];

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
];

const DECOMPOSE_MAP = {
  ㄲ: ['ㄱ', 'ㄱ'],
  ㄸ: ['ㄷ', 'ㄷ'],
  ㅃ: ['ㅂ', 'ㅂ'],
  ㅆ: ['ㅅ', 'ㅅ'],
  ㅉ: ['ㅈ', 'ㅈ'],
  ㅖ: ['ㅕ', 'ㅣ'],
  ㅒ: ['ㅑ', 'ㅣ'],
  ㄳ: ['ㄱ', 'ㅅ'],
  ㄵ: ['ㄴ', 'ㅈ'],
  ㄶ: ['ㄴ', 'ㅎ'],
  ㄺ: ['ㄹ', 'ㄱ'],
  ㄻ: ['ㄹ', 'ㅁ'],
  ㄼ: ['ㄹ', 'ㅂ'],
  ㄽ: ['ㄹ', 'ㅅ'],
  ㄾ: ['ㄹ', 'ㅌ'],
  ㄿ: ['ㄹ', 'ㅍ'],
  ㅀ: ['ㄹ', 'ㅎ'],
  ㅄ: ['ㅂ', 'ㅅ'],
};

function isHangul(c) {
  const code = c.charCodeAt(0);
  return code >= 0xac00 && code <= 0xd7a3;
}

function splitJamo(c) {
  if (!isHangul(c)) {
    return [];
  }

  const code = c.charCodeAt(0) - 0xac00;
  const jong = code % 28;
  const jung = ((code - jong) / 28) % 21;
  const cho = Math.floor(code / 28 / 21);

  const result = [];
  result.push(CHOSUNG[cho]);
  result.push(JUNGSUNG[jung]);
  if (jong > 0) {
    result.push(JONGSUNG[jong]);
  }
  return result.flatMap((jamo) => DECOMPOSE_MAP[jamo] ?? [jamo]);
}

function splitWordToJamo(word) {
  const result = [];
  for (const char of word) {
    result.push(...splitJamo(char));
  }
  return result;
}

function isValidForGame(jamos) {
  // 자모 5개인지
  if (jamos.length !== 5) return false;
  // 복합 모음 없는지
  if (jamos.some((jamo) => COMPLEX_VOWELS.includes(jamo))) return false;
  return true;
}

// CSV 읽기
const csv = fs.readFileSync('./scripts/kr_korean.csv', 'utf-8');
const lines = csv.split('\n');

const result = [];
const seen = new Set();

for (const line of lines) {
  const [word, part] = line.split(',');

  // 명사만, 하이픈 없는 것만
  if (part?.trim() !== '명사') continue;
  if (word.includes('-')) continue;

  const jamos = splitWordToJamo(word.trim());
  if (!isValidForGame(jamos)) continue;

  if (seen.has(word.trim())) continue;
  seen.add(word.trim());

  result.push({ word: word.trim(), letters: jamos });
}

fs.writeFileSync('./src/data/wordList.json', JSON.stringify(result, null, 2));
console.log(`완료: ${result.length}개 단어`);
