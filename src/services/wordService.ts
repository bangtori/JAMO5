import type { Word } from '../types';
import wordList from '../data/wordList.json';

export function getRandomWord(): Word {
  const words = wordList as Word[];
  return words[Math.floor(Math.random() * words.length)];
}
