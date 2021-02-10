import { useCallback, useContext, useState } from 'react';

import GameContext from '../context/GameContext';

import {
  addNewWord,
  checkWord,
  isWordExist,
  validResult,
  invalidResult,
} from '../controllers/wordController';

import { IResult, TWordResult } from '../utils/types';
import { TUseWord } from './types';

const useWord = (): TUseWord => {
  const { state, dispatch } = useContext(GameContext);

  const [wordResponse, setWordResponse] = useState<TWordResult>();

  const checkResponse = (response: IResult): TWordResult => {
    if (!state.currentWord) {
      return validResult(response.response);
    }

    if (!response.found) {
      return invalidResult(response.response);
    }

    const { charLength, letterFromEnd } = state.preferences;

    const isValid = checkWord(state.currentWord, response.response, charLength, letterFromEnd);
    if (!isValid) {
      return invalidResult(`"${response.response}" is invalid, game over!`);
    }

    const isExist = isWordExist(response.response, state.game);
    if (isExist) {
      return invalidResult(`"${response.response}" exists, game over!`);
    }

    return validResult();
  };

  const saveWord = useCallback(
    (response: IResult) => {
      if (state.timer.timeIsUp) {
        setWordResponse(invalidResult('Your answer is invalid.'));
        return; // Block game.
      }

      const result = checkResponse(response);

      if (result.invalid) {
        setWordResponse(result);
        return;
      }

      const data = addNewWord(response.response, state.game, state.currentPlayer);

      setWordResponse(validResult(response.response));
      dispatch({ type: 'currentWord', payload: response.response });
      dispatch({ type: 'game', payload: data });
    },
    [state.currentWord, state.game, state.currentPlayer],
  );

  return { saveWord, wordResponse };
};

export default useWord;
