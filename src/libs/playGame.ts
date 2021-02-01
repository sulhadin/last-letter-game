import words from './data/names.json';
import { IResult, IPayload } from './interfaces';
import configuration from './configuration';
import { Spoken, Word } from './types';
import lastArrayItem from './utils';
import randomize from './randomize';

const lostMessage = "Sorry, I've lost :(";

function probability(n: number) {
  return !!n && Math.random() <= n;
}

const splicer = (fromStart: boolean, length: number) => {
  return (word: string) => {
    const startIndex = fromStart ? 0 : word.length - 1;

    return word.substr(startIndex, length);
  };
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

function seekAndFind(payload: IPayload): IResult {
  const formString = splicer(payload.computerFromStart, payload.charLength);

  const result = words.find((word) => {
    if (payload.spoken.length > 0) {
      return (
        formString(word) === payload.value && !payload.spoken.some(({ item }) => item === word)
      );
    }

    return formString(word) === payload.value;
  });

  if (!result) {
    return resultFormatter(lostMessage, false);
  }

  return resultFormatter(result);
}

function playGame(spoken: Spoken): IResult {
  const value = lastArrayItem<Word>(spoken);
  const formedWord = splicer(configuration.playerFromStart, configuration.charLength)(value.item);

  const shouldFind = probability(configuration.probabilityPercent);

  if (!shouldFind) {
    return resultFormatter(lostMessage, false);
  }

  const data = {
    ...configuration,
    spoken,
    value: formedWord,
  };

  return seekAndFind(data);
}

export { playGame, getRandomWord };
