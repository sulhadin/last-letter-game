import { useCallback, useContext, useState } from 'react';

import GameContext from '../context/GameContext';

import {
  addNewWord,
  checkWord,
  isWordExist,
  validResult,
  invalidResult,
} from '../controllers/wordController';

import { IResult, TWordResult, TUseWord } from '../utils/types';

/**
 * A React hook that validates the spoken word and saves it and delivers a result {@link TWordResult} in return.
 *
 * @func useWord
 * @memberOf React
 * @return {TUseWord} - Returns {@link saveWord} that saves the response, {@link wordResponse} that contains word response.
 */
const useWord = (): TUseWord => {
  const { state, dispatch } = useContext(GameContext);

  const [wordResponse, setWordResponse] = useState<TWordResult>();

  /**
   * There is a business rule for validating a word.
   *  - A result should not be empty
   *  - A new word should be found by players
   *  - Last word should start with previous word's start|end letters in regarding with specified preferences.
   *  - Last word should not be spoken before in restricted mode which can be changed in preferences.
   * @param {IResult} result - Response of player.
   * @function checkResponse
   * @inner
   */
  const checkResponse = (result: IResult): TWordResult => {
    if (!state.currentWord) {
      return validResult(result.response);
    }

    if (!result.found) {
      return invalidResult(result.response);
    }

    const { charLength, letterFromEnd, restricted } = state.preferences;

    const isValid = checkWord(state.currentWord, result.response, charLength, letterFromEnd);
    if (!isValid) {
      return invalidResult(`"${result.response}" is invalid, game over!`);
    }

    if (restricted) {
      const isExist = isWordExist(result.response, state.game);
      if (isExist) {
        return invalidResult(`"${result.response}" exists, game over!`);
      }
    }

    return validResult();
  };

  /**
   * Saves given word.
   *  Checks word validity, if satisfied,
   *    adds the new word [Add logic]{@link addNewWord}
   *    dispatches the global state.
   *    updates local response state {@link TWordResult} as valid
   *  If not
   *    updates local response state {@link TWordResult} as invalid with a fail message.
   *
   * @function checkResponse
   * @inner
   */
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
