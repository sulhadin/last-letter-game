import { TGame } from './types';

export const probability = (n: number): boolean => {
  return !!n && Math.random() <= n;
};

export const splicer = (word: string, length: number, fromEnd: boolean): string => {
  const startIndex = fromEnd ? word.length - 1 : 0;
  return word.substr(startIndex, length);
};

export const getWords = (gameMap: TGame): string[] => {
  return Object.values(gameMap).flat();
};

export const checkWord = (
  prevWord: string,
  word: string,
  charLength: number,
  lettersFromEnd: boolean,
): boolean => {
  const letters = splicer(prevWord, charLength, lettersFromEnd);
  return word.startsWith(letters);
};

export const isWordExist = (word: string, words: string[]): boolean => {
  return words.includes(word);
};
