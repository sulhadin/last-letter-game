import { useState, useCallback, useContext } from 'react';

import GameContext from '../context/GameContext';

import { getRandomWord, aiController } from '../controllers/aiController';
import { getWords } from '../controllers/wordController';
import delay from '../utils/delay';

import { AIPlayerType } from '../utils/enums';
import { IPlayerResult, IResult } from '../utils/types';
import { TAIPlay } from './types';

const useAIPlay = (type: string, word?: string): TAIPlay => {
  const { state } = useContext(GameContext);

  const aiWordLogic = {
    [AIPlayerType.COMPUTER]: {
      seekWord(wordList: string[]): IResult | null {
        if (word) {
          return aiController(word, wordList, state.preferences);
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

export default useAIPlay;
