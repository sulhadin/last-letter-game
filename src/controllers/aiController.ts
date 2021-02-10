import names from '../assets/data/names.json';
import { IResult, IPayload, TPreferences, TWordGetter, IWordGetter } from '../utils/types';
import randomize from '../utils/randomize';
import { probability } from './playerController';
import { slicer } from './wordController';
import { AIPlayerType } from '../utils/enums';
import delay from '../utils/delay';

const lostMessage = 'Sorry, did not find :(';

/**
 * Gets random name in names array.
 *
 * Generates a random index number between 0 and name.length, then gets the name based on the index.
 *
 * @return {IResult} Returns a found name in result.
 * @see [Random generator]{@link randomize}
 */
function getRandomWord(): IResult {
  const index = randomize(0, names.length - 1);

  return {
    response: names[index],
    found: true,
  };
}

/**
 * Seeks and finds a word that starts with the letters parameter in payload and also skips the ones in the 'words'.
 *
 * @param {IPayload} payload - Payload that contains letters and words.
 * @return {IResult} Returns a successful or failed information in result.
 * @example
 *    const names = ['Sulhadin', 'Sümeyye', 'Kübra', 'Fatih']
 *    const words = ['Sulhadin']
 *
 *    restrictedSeekAndFind({letters: 's', words: words})
 *    // => {response: 'Sümeyye', found: true }
 *
 *    restrictedSeekAndFind({letters: 's', words: words})
 *    // => {response: 'Sorry, did not find :(', found: false }
 *    // Did not find since words array is now ['Sulhadin', 'Sümeyye']
 *
 */
function restrictedSeekAndFind(payload: IPayload): IResult {
  const result = names.find(
    (word) => word.startsWith(payload.letters) && !payload.words?.includes(word),
  );

  if (!result) {
    return {
      response: lostMessage,
      found: false,
    };
  }

  return {
    response: result,
    found: true,
  };
}

/**
 * Seeks and finds a word that starts with letters parameter in payload.
 *
 * @func seekAndFind
 * @param {IPayload} payload - Payload that contains letters parameter.
 * @return {IResult} Returns a successful or failed information in result.
 * @example
 *
 *    seekAndFind({letters: 's'});
 *    // {response: 'Sümeyye', found: true};
 */
function seekAndFind(payload: IPayload): IResult {
  const result = names.find((word) => word.startsWith(payload.letters));

  if (!result) {
    return {
      response: lostMessage,
      found: false,
    };
  }

  return {
    response: result,
    found: true,
  };
}

/**
 * Determines whether AI should find an answer or not up to given percentage. Returns failed result if AI should not
 * find an answer.
 *
 * @func probabilityLogic
 * @param {number} probabilityPercent - Up to percentage that AI can find an answer.
 * @return {IResult} Returns a successful or failed information in result.
 * @see [Probability function]{@link probability}
 * @example
 *
 *    probabilityLogic(1);
 *    // {response: '', found: true };
 *
 *    probabilityLogic(0);
 *    // {response: 'Sorry, did not find :(', found: false };
 *
 *    probabilityLogic(0.3);
 *    // returns success or fail up to 30%
 */
function probabilityLogic(probabilityPercent: number): IResult {
  const shouldFind = probability(probabilityPercent);

  if (!shouldFind) {
    return {
      response: lostMessage,
      found: false,
    };
  }

  return {
    response: '',
    found: true,
  };
}

/**
 * Core logics plays a grand role in AI decision of finding a new word. One of them is {@link probabilityLogic}.
 * The reason is to make AI act like human in terms of finding a word to say.
 * There is a percentage given as a parameter in preferences to be taken into account before finding a word.
 * Computer fails up to given percentage and returns failed result.
 *
 * If succeeds, slices a word and get letters from it considering parameters inside preferences and gets word which
 * by passing letters, which is the other role in AI decision.
 *
 * Two types of seeking word are used in terms of restriction rule; {@link restrictedSeekAndFind}, {@link seekAndFind}
 * one of them is been called considering restriction rule.
 *
 * @func seekWord
 * @param {string} word - A Word that is needed to be taken into account when finding the next word.
 * @param {string[]} words - A list of word that has been spoken before.
 * @param {TPreferences} preferences - A set of parameters of game state.
 * @return {IResult} - Returns a successful or failed information in result.
 * @see [Slicer]{@link slicer}, [Probability]{@link probabilityLogic}
 * @see [Restricted find]{@link restrictedSeekAndFind}, [Find]{@link seekAndFind}
 * @example
 *
 *     const preferences = {probabilityPercent: 1, charLength: 1, letterFromEnd: true, restricted: true};
 *     const words = ['Nalan', 'Kadir']
 *
 *     seekWord('Sulhadin', words, preferences);
 *     // { response: 'Nihat', found: true }
 *
 *     seekWord('Tarık', words, preferences);
 *     // { response: 'Kemal', found: true }
 *
 *     // After changing some items of preferences.
 *     preferences.charLength = 2; // Get two letter from end
 *
 *     seekWord('AhmET', words, preferences);
 *     // { response: 'ETem', found: true }
 *
 *     seekWord('EMbiya', words, preferences);
 *     // { response: 'YAsin', found: true }
 *
 *    preferences.letterFromEnd = false; // Get first {charLength} letter
 *
 *    seekWord('Hakan', words, preferences);
 *    // { response: 'Hakim', found: true }
 *
 *    seekWord('Halit', words, preferences);
 *    // { response: 'Haydar', found: true }
 */
function seekWord(word: string, words: string[], preferences: TPreferences): IResult {
  const result = probabilityLogic(preferences.probabilityPercent);

  if (!result.found) {
    return result;
  }

  const letters = slicer(word, preferences.charLength, preferences.letterFromEnd);

  if (preferences.restricted) {
    return restrictedSeekAndFind({ letters, words });
  }

  return seekAndFind({ letters });
}

/**
 * Takes a {@link TWordGetter} and returns {@link IWordGetter} which is an object based on player type.
 * Functions in the object are player specific, so more than one player can be specified.
 *
 * @func wordGetter
 * @param {TWordGetter} params
 * @return {IWordGetter} - Returns a player type based object that contains player based business logic.
 * @see [Find word]{@link seekWord}, [Random word]{@link getRandomWord}, [Delay]{@link delay}
 * @example
 *
 *    const params = { word: 'Andre', words: ["Ahmet", "Begüm"], preferences }
 *
 *    const aiPlayer = wordGetter(params);
 *
 *    const computer = aiPlayer['COMPUTER']
 *    const autoPlayer = aiPlayer['AUTO_PLAYER']
 *
 *    // => run computer|autoPlayer.seekWord(); will return {@link IResult} according to 'params'
 *    // => run computer|autoPlayer.waitForWord(callback); will return void that runs callback.
 */
const wordGetter = (params: TWordGetter): IWordGetter => ({
  [AIPlayerType.COMPUTER]: {
    seekWord(): IResult {
      return seekWord(params.word, params.words, params.preferences);
    },
    waitForWord(getWord: () => void): void {
      delay(getWord, [1000, 3000]);
    },
  },
  [AIPlayerType.AUTO_PLAYER]: {
    seekWord(): IResult {
      return getRandomWord();
    },
    waitForWord(getWord: () => void): void {
      delay(getWord, 100);
    },
  },
});

export { seekWord, getRandomWord, wordGetter };
