import words from './data/names.json';
import { IResult, IPayload } from './interfaces';
import configuration from './configuration';
import { Spoken, Word } from './types';
import lastArrayItem from './utils';

const notFound: IResult = {
  response: "Sorry, I've lost :(",
  found: false,
};

function probability(n: number) {
  return !!n && Math.random() <= n;
}

const splicer = (fromStart: boolean, length: number) => {
  return (word: string) => {
    const startIndex = fromStart ? 0 : word.length - 1;

    return word.substr(startIndex, length);
  };
};

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
    return notFound;
  }

  return {
    response: result,
    found: true,
  };
}
function computerLogic(payload: IPayload): IResult {
  const shouldFind = probability(payload.probabilityPercent);

  if (!shouldFind) {
    return notFound;
  }

  return seekAndFind(payload);
}

function playGame(spoken: Spoken): IResult {
  const value = lastArrayItem<Word>(spoken);
  const formedWord = splicer(configuration.playerFromStart, configuration.charLength)(value.item);

  const data = {
    ...configuration,
    spoken,
    value: formedWord,
  };

  return computerLogic(data);
}

export default playGame;
