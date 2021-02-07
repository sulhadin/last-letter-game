import { useState, useCallback, useContext } from 'react';

import { getRandomWord, seekWord } from '../controllers/seekWord';
import { getWords } from '../libs/utils';
import delay from '../libs/delay';
import GameContext from '../context/GameContext';
import { IPlayerResult, IResult } from '../libs/types';
import { AIPlayerType } from '../libs/enums';

type TComputerPlayer = {
  response: IPlayerResult;
  play: () => void;
};

const useComputerPlayer = (type: string, word?: string): TComputerPlayer => {
  const { state } = useContext(GameContext);

  const aiWordLogic = {
    [AIPlayerType.COMPUTER]: {
      seekWord(wordList: string[]): IResult | null {
        if (word) {
          return seekWord(word, wordList, state.preferences);
        }
        return null;
      },
    },
    [AIPlayerType.AUTO_PLAYER]: {
      seekWord(wordList: string[]): IResult | null {
        if (!wordList.length) {
          return getRandomWord();
        }
        return null;
      },
    },
  };

  const [response, setResponse] = useState<IPlayerResult>({
    played: false,
    response: '',
    found: false,
  });

  const getWord = useCallback(
    (wordList: string[]) => {
      const search = aiWordLogic[type];
      if (search) {
        const answer = search.seekWord(wordList);

        if (answer) {
          setResponse({ ...answer, played: true });
        }
      }
    },
    [state.currentPlayer],
  );

  const play = () => {
    const words = getWords(state.game);
    delay(() => getWord(words), [1000, 3000]);
  };

  return { response, play };
};

export default useComputerPlayer;
