import { TGame, TPlayer, TWordResult } from '../utils/types';

export const slicer = (word: string, length: number, fromEnd: boolean): string => {
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
  const letters = slicer(prevWord, charLength, lettersFromEnd);
  return word.toUpperCase().startsWith(letters.toUpperCase());
};

export const isWordExist = (word: string, game: TGame): boolean => {
  const words = getWords(game);
  return words.includes(word);
};

export const addNewWord = (word: string, words: TGame, player: TPlayer): TGame => {
  if (!player) {
    return words;
  }

  const copyWords = [...words[player]];
  copyWords.push(word);

  return {
    ...words,
    [player]: copyWords,
  };
};

export const validResult = (response?: string): TWordResult => {
  return {
    result: response ?? '',
    valid: true,
  };
};

export const invalidResult = (response?: string): TWordResult => {
  return {
    result: response ?? '',
    invalid: true,
  };
};
