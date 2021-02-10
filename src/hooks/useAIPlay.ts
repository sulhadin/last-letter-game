import { useState, useContext, useMemo } from 'react';

import GameContext from '../context/GameContext';

import { wordGetter } from '../controllers/aiController';
import { getWords } from '../controllers/wordController';

import { IPlayerResult } from '../utils/types';
import { TAIPlay } from './types';

/**
 * A React hook that initialize functions according to player type, that gets word.
 *
 *
 * @param {string} type - Player type which can be COMPUTER | AUTO_PLAYER | ...
 * @param {string} word - Last spoken word.
 * @return {TAIPlay} - Returns response of player and 'play' callback to be triggered when it is AI turn again.
 */
const useAIPlay = (type: string, word: string): TAIPlay => {
  const { state } = useContext(GameContext);

  const [response, setResponse] = useState<IPlayerResult>({
    played: false,
    response: '',
    found: false,
  });

  const words = useMemo(() => getWords(state.game), [state.game]);

  const wordGetterParams = { word, words, preferences: state.preferences };

  const aiWordGetter = useMemo(() => wordGetter(wordGetterParams), [wordGetterParams]);
  const search = useMemo(() => aiWordGetter[type], [type]);

  const getWord = () => {
    const answer = search.seekWord();
    setResponse({ ...answer, played: true });
  };

  const play = () => {
    search.waitForWord(() => getWord());
  };

  return { response, play };
};

export default useAIPlay;
