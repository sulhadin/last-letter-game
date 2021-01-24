import words from './data/names.json';
import { IResponse } from './interfaces';
import { Payload } from './types';

const notFound: IResponse = {
  response: "Sorry, I've lost :(",
  found: false,
};

function probability(n: number) {
  return !!n && Math.random() <= n;
}

const stringSplicer = (fromStart: boolean, length: number) => {
  return (word: string) => {
    const startIndex = fromStart ? 0 : word.length - 1;

    return word.substr(startIndex, length);
  };
};

function seekAndFind(payload: Payload): IResponse {
  const formString = stringSplicer(payload.computerFromStart, payload.charLength);

  const result = words.find((word) => formString(word) === payload.value);
  if (!result) {
    return notFound;
  }

  return {
    response: result,
    found: true,
  };
}
function computerLogic(payload: Payload): IResponse {
  const shouldFind = probability(payload.probabilityPercent);

  if (!shouldFind) {
    return notFound;
  }

  return seekAndFind(payload);
}

function playGame(payload: Payload): IResponse {
  const formedWord = stringSplicer(payload.playerFromStart, payload.charLength)(payload.value);

  const data = {
    ...payload,
    value: formedWord,
  };

  return computerLogic(data);
}

export default playGame;
