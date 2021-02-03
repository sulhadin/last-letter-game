import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import GameContext from '../context/GameContext';
import { checkWord } from '../controllers/playGame';
import playerType from '../libs/playerType';
import { TPlayer } from '../libs/types';

export type IWordController = {
  notValidMessage: string;
  lastWord: string;
  addWord: (value: string) => void;
};

const useWordController = (): IWordController => {
  const { state, dispatch } = useContext(GameContext);

  const [lastWord, setLastWord] = useState<string>('');
  const [notValidMessage, setNotValidMessage] = useState<string>('');
  const resolveRef = useRef<(value: string) => void>();

  const isWordValid = (newWord: string): boolean => {
    const isValid = checkWord(
      lastWord,
      newWord,
      state.preferences.charLength,
      state.preferences.letterFromEnd,
    );

    if (!isValid) {
      const user = playerType(state.currentPlayer, state.players);
      setNotValidMessage(`${user} lost.`);
    }
    return isValid;
  };

  const addWord = (word: string) => {
    if (isWordValid(word)) {
      resolveRef?.current?.(word);
    }
  };

  const getWord = useCallback(() => {
    return new Promise((resolve: (word: string) => void) => {
      resolveRef.current = resolve;
    });
  }, [state.game]);

  const saveWord = useCallback(
    (newWord: string, player: TPlayer, game: { [key: string]: string[] }) => {
      let gameData = game;

      if (player) {
        const words = [...game[player]];
        words.push(newWord);

        gameData = {
          ...game,
          [player]: words,
        };
      }

      dispatch({ type: 'game', payload: gameData });
    },
    [state.game],
  );

  useEffect(() => {
    const fn = async () => {
      const newWord = await getWord();
      setLastWord(newWord);

      saveWord(newWord, state.currentPlayer, state.game);
    };

    fn().then();
  }, [state.currentPlayer]);

  return { notValidMessage, lastWord, addWord };
};

export default useWordController;
