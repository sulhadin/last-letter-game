import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { AppContext } from '../../../context/reducers';
import { nextPlayer } from '../../../libs/Players';

export type IUseGamePlay = {
  lastWord: string;
  addWord: (value: string) => void;
};

const useGamePlay = (): IUseGamePlay => {
  const { state, dispatch } = useContext(AppContext);
  const [lastWord, setLastWord] = useState<string>('');
  const resolveRef = useRef<(value: string) => void>();

  const switchPlayer = useCallback(() => {
    const player = nextPlayer(state.currentPlayer, state.players);
    dispatch({ type: 'currentPlayer', payload: player });
  }, [state]);

  const addWord = (word: string) => {
    resolveRef?.current?.(word);
    setLastWord(word);
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

  return { lastWord, addWord };
};

export default useGamePlay;
