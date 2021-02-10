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

/**
 * A React hook that validates the spoken word and saves it and delivers a result {@link TWordResult} in return.
 *
 * There is a business rule for validating a word.
 *  - A response should not be empty
 *  - A new word should be found by players
 *  - Last word should start with previous word's start|end letters in regarding with specified preferences.
 *  - Last word should not be spoken before in restricted mode which can be changed in preferences.
 *
 *  If all conditions satisfied,
 *    adds the new word [Add logic]{@link addNewWord}
 *    dispatches the global state.
 *    updates local response state {@link TWordResult} as valid
 *  If not
 *    updates local response state {@link TWordResult} as invalid with a fail message
 *
 * @func useWord
 * @memberOf React
 * @return {TUseWord}
 */
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

    const { charLength, letterFromEnd, restricted } = state.preferences;

    const isValid = checkWord(state.currentWord, response.response, charLength, letterFromEnd);
    if (!isValid) {
      return invalidResult(`"${response.response}" is invalid, game over!`);
    }

    if (restricted) {
      const isExist = isWordExist(response.response, state.game);
      if (isExist) {
        return invalidResult(`"${response.response}" exists, game over!`);
      }
    }

    return validResult();
  };

  const saveWord = useCallback(
    (response: IResult) => {
      if (state.timer.timeIsUp) {
        setWordResponse(invalidResult('Your answer is invalid!'));
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
