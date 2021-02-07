import names from '../assets/data/names.json';
import { IResult, IPayload, TPreferences } from '../utils/types';
import randomize from '../utils/randomize';
import { probability } from './playerController';
import { splicer } from './wordController';

const lostMessage = "Sorry, I've lost :(";

function resultFormatter(word: string, found = true): IResult {
  return {
    response: word,
    found,
  };
}

function getRandomWord(): IResult {
  const index = randomize(0, names.length - 1);
  return resultFormatter(names[index]);
}

function restrictedSeekAndFind(payload: IPayload): IResult {
  const result = names.find(
    (word) => word.startsWith(payload.letters) && !payload.words?.includes(word),
  );

  if (!result) {
    return resultFormatter(lostMessage, false);
  }

  return resultFormatter(result);
}

/**
 *
 * @param payload
 */
function seekAndFind(payload: IPayload): IResult {
  const result = names.find((word) => word.startsWith(payload.letters));

  if (!result) {
    return resultFormatter(lostMessage, false);
  }

  return resultFormatter(result);
}

/**
 *
 * @param probabilityPercent
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
 *
 * @param word
 * @param words
 * @param preferences
 */
function aiController(word: string, words: string[], preferences: TPreferences): IResult {
  const result = probabilityLogic(preferences.probabilityPercent);

  if (!result.found) {
    return result;
  }

  const letters = splicer(word, preferences.charLength, preferences.letterFromEnd);

  if (preferences.restricted) {
    return restrictedSeekAndFind({ letters, words });
  }

  return seekAndFind({ letters });
}

export { aiController, getRandomWord };
