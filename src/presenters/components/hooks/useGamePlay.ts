import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { AppContext } from '../../../context/reducers';
import { nextPlayer } from '../../../libs/Players';
import { checkWord } from '../../../libs/playGame';
import userType from '../../../libs/userType';

export type IUseGamePlay = {
  notValidMessage: string;
  lastWord: string;
  addWord: (value: string) => void;
};

const useGamePlay = (): IUseGamePlay => {
  const { state, dispatch } = useContext(AppContext);
  const [lastWord, setLastWord] = useState<string>('');
  const [notValidMessage, setNotValidMessage] = useState<string>('');
  const resolveRef = useRef<(value: string) => void>();

  const switchPlayer = useCallback(() => {
    const player = nextPlayer(state.currentPlayer, state.players);
    dispatch({ type: 'currentPlayer', payload: player });
  }, [state]);

  function isWordValid(newWord: string) {
    const isValid = checkWord(
      lastWord,
      newWord,
      state.preferences.charLength,
      state.preferences.letterFromEnd,
    );

    if (!isValid) {
      const user = userType(state.currentPlayer, state.players);
      setNotValidMessage(`${user} lost.`);
    }
    return isValid;
  }

  const addWord = (word: string) => {
    if (isWordValid(word)) {
      resolveRef?.current?.(word);
      setLastWord(word);
    }
  };

  const saveWord = useCallback(
    async (player: string | null, game: { [key: string]: string[] }) => {
      const newWord: string = await new Promise((resolve) => {
        resolveRef.current = resolve;
      });

      if (player) {
        const words = [...game[player]];
        words.push(newWord);

        return {
          ...game,
          [player]: words,
        };
      }

      return game;
    },
    [state.game],
  );

  useEffect(() => {
    console.log('AWAITING..');

    saveWord(state.currentPlayer, state.game)
      .then((game) => {
        dispatch({ type: 'game', payload: game });
      })
      .finally(() => switchPlayer());
  }, [state.currentPlayer]);

  return { notValidMessage, lastWord, addWord };
};

export default useGamePlay;
