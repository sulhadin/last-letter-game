import { TGame, TPlayer, TWordResult } from '../utils/types';

/**
 * Slices letters from beginning|end of the word.
 *
 * @param {string} word - A word from which letters that will be sliced.
 * @param {number} length - Letter count that is to be sliced from the word.
 * @param {boolean} fromEnd - Whether the letters should be sliced from end or beginning of the word.
 * @return {string} - Returns {length} letters that are sliced from the word.
 * @example
 *
 *    slicer('Ahmet', 1, true);
 *    // => 't'
 *
 *    slicer('Ahmet', 2, true);
 *    // => 'et'
 *
 *    slicer('Ahmet', 1, false);
 *    // => 'A'
 *
 *    slicer('Ahmet', 2, false);
 *    // => 'Ah'
 *
 */
export const slicer = (word: string, length: number, fromEnd: boolean): string => {
  const startIndex = fromEnd ? word.length - 1 : 0;
  return word.substr(startIndex, length);
};

/**
 * Merges and returns the word arrays in game object.
 *
 * @param {TGame} game - Game object that contains player-words pair.
 * @return {string[]} - Returns flatten array of player words.
 * @example
 *
 *    getWords({Player1: ['Sül', 'Barki'], Player2: ['Süm', 'Esma']});
 *    // => ['Sül', 'Barki', 'Süm', 'Esma']
 */
export const getWords = (game: TGame): string[] => {
  return Object.values(game).flat();
};

/**
 * Compares previous word and word, checks if the word starts with
 * the last|first {charLength} letter/s of previous word.
 *
 *
 * @param {string} prevWord - Previously spoken word which letters to be taken from.
 * @param {string} word - A Word to be checked if starts with specified letters.
 * @param {string} charLength - Letter count that is to be taken from previous word.
 * @param {string} lettersFromEnd - Whether the letters should be taken from end or beginning of the word.
 * @return {boolean} - Returns true if word suits the case.
 * @see [Slicer]{@link slicer}
 * @example
 *
 *    checkWord('Barki', 'Esma', 1, true);
 *    // => false
 *
 *    checkWord('Ahmet', 'Tarık', 1, true);
 *    // => true
 *
 *    checkWord('Ahmet', 'Tarık', 1, false);
 *    // => false
 *
 *    checkWord('Ahmet', 'Ayten', 1, false);
 *    // => true
 *
 *    checkWord('Ahmet', 'Ayten', 2, false);
 *    // => false
 *
 *    checkWord('Ahmet', 'Ahsen', 2, false);
 *    // => true
 */
export const checkWord = (
  prevWord: string,
  word: string,
  charLength: number,
  lettersFromEnd: boolean,
): boolean => {
  const letters = slicer(prevWord, charLength, lettersFromEnd);
  return word.toUpperCase().startsWith(letters.toUpperCase());
};

/**
 * Check whether given word exists in the given game object.
 *
 * @func isWordExist
 * @param {string} word - A word.
 * @param {TGame} game - A Game object in which the word will be searched.
 * @return {boolean} Returns true if includes, and false if not.
 * @see [get words]{@link getWords}
 * @example
 *
 *    const game = {Player1: ['Sül'], Player2: ['Süm']}
 *
 *    isWordExist('Süm', game)
 *    // => true
 *
 *    isWordExist('Küb', game)
 *    // => false
 */
export const isWordExist = (word: string, game: TGame): boolean => {
  const words = getWords(game);
  return words.includes(word);
};

/**
 * Adds a new `word` to `player`'s spoken words.
 *
 * @param {string} word - A new word to be added in the game object' player list.
 * @param {TGame} game - Game object that contains player-words pair.
 * @param {TPlayer} player - Current player.
 * @return {TGame} - New game object.
 * @example
 *
 * const game = {Player1: ['Sül'], Player2: []}
 *
 * addNewWord('Süm', game, 'Player1');
 * // => {Player1: ['Sül', 'Süm'], Player2: []}
 *
 */
export const addNewWord = (word: string, game: TGame, player: TPlayer): TGame => {
  if (!player) {
    return game;
  }

  const copyWords = [...game[player]];
  copyWords.push(word);

  return {
    ...game,
    [player]: copyWords,
  };
};

/**
 * Composes a valid result.
 *
 * @func validResult
 * @param {string=} response - A message to be composed.
 * @return {TWordResult} - Returns a valid result.
 * @example
 *
 *    validResult('Result is valid.');
 *    // => {result: 'Result is valid.', valid: true}
 *
 *    validResult();
 *    // => {result: '', valid: true}
 */
export const validResult = (response?: string): TWordResult => {
  return {
    result: response ?? '',
    valid: true,
  };
};

/**
 * Composes an invalid result.
 *
 * @func invalidResult
 * @param {string=} response - A message to be composed.
 * @return {TWordResult} - Returns an invalid result.
 * @example
 *
 *    invalidResult('Result is invalid.');
 *    // => {result: 'Result is invalid.', invalid: true}
 *
 *    invalidResult();
 *    // => {result: '', invalid: true}
 */
export const invalidResult = (response?: string): TWordResult => {
  return {
    result: response ?? '',
    invalid: true,
  };
};
