import words from '../libs/data/names.json';
import { IResult, IPayload, TPreferences } from '../libs/types';
import randomize from '../libs/randomize';

const lostMessage = "Sorry, I've lost :(";

function probability(n: number): boolean {
  return !!n && Math.random() <= n;
}

const splicer = (word: string, length: number, fromEnd: boolean): string => {
  const startIndex = fromEnd ? word.length - 1 : 0;
  return word.substr(startIndex, length);
};

function resultFormatter(word: string, found = true): IResult {
  return {
    response: word,
    found,
  };
}

function getRandomWord(): IResult {
  const index = randomize(0, words.length - 1);
  return resultFormatter(words[index]);
}

function restrictedSeekAndFind(payload: IPayload): IResult {
  const result = words.find(
    (word) => word.startsWith(payload.letters) && !payload.spoken?.includes(word),
  );

  if (!result) {
    return resultFormatter(lostMessage, false);
  }

  return resultFormatter(result);
}

function seekAndFind(payload: IPayload): IResult {
  const result = words.find((word) => word.startsWith(payload.letters));

  if (!result) {
    return resultFormatter(lostMessage, false);
  }

  return resultFormatter(result);
}

function probabilityLogic(probabilityPercent: number): IResult {
  const shouldFind = probability(probabilityPercent);

  if (!shouldFind) {
    return resultFormatter(lostMessage, false);
  }

  return resultFormatter('', true);
}

function playGame(word: string, spoken: string[], preferences: TPreferences): IResult {
  const result = probabilityLogic(preferences.probabilityPercent);
  if (!result.found) {
    return result;
  }

  const letters = splicer(word, preferences.charLength, preferences.letterFromEnd);

  if (preferences.restricted || spoken?.length === 0) {
    return restrictedSeekAndFind({ letters, spoken });
  }

  return seekAndFind({ letters });
}

function checkWord(
  prevWord: string,
  word: string,
  charLength: number,
  lettersFromEnd: boolean,
): boolean {
  const letters = splicer(prevWord, charLength, lettersFromEnd);
  return word.startsWith(letters);
}

export { playGame, getRandomWord, checkWord };
