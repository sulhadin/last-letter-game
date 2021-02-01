import words from './data/names.json';
import { IResult, IPayload } from './interfaces';
import randomize from './randomize';

const lostMessage = "Sorry, I've lost :(";

function probability(n: number) {
  return !!n && Math.random() <= n;
}

const splicer = (word: string, length: number, fromEnd: boolean) => {
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

function playGame(word: string, spoken?: string[]): IResult {
  const conf = {
    charLength: 1,
    lettersFromEnd: true, // Also can get letters from beginning to make the game more interesting.
    probabilityPercent: 1,
    restricted: true,
  };

  const result = probabilityLogic(conf.probabilityPercent);
  if (!result.found) {
    return result;
  }

  const letters = splicer(word, conf.charLength, conf.lettersFromEnd);

  if (conf.restricted || spoken?.length === 0) {
    return restrictedSeekAndFind({ letters });
  }

  return seekAndFind({ letters, spoken });
}

export { playGame, getRandomWord };
