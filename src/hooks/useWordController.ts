import { useCallback, useContext, useState } from 'react';
import { addNewWord, checkWord, isWordExist, validResult, invalidResult } from '../libs/utils';
import { IResult, TWordResult } from '../libs/types';
import GameContext from '../context/GameContext';

interface IWordController {
  saveWord: (response: IResult) => void;
  wordResponse: TWordResult | undefined;
}

const useWordController = (): IWordController => {
  const { state, dispatch } = useContext(GameContext);

  const [wordResponse, setWordResponse] = useState<TWordResult>();

  const checkResponse = (response: IResult): TWordResult => {
    console.log(response);
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
      console.log('response', response);
      if (state.timer.timeIsUp) {
        setWordResponse(invalidResult('Your answer is invalid.'));
        return; // Block game.
      }

      const result = checkResponse(response);

      if (result.invalid) {
        setWordResponse(result);
        return;
      }

      console.log(response.response, state.game, state.currentPlayer);
      const data = addNewWord(response.response, state.game, state.currentPlayer);

      console.log(data);
      setWordResponse(validResult(response.response));
      dispatch({ type: 'currentWord', payload: response.response });
      dispatch({ type: 'game', payload: data });
    },
    [state.currentWord, state.game, state.currentPlayer],
  );

  return { saveWord, wordResponse };
};

export default useWordController;
