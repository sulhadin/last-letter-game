import { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/reducers';
import useGamePlay from './useGamePlay';
import useComputerPlay from './useComputerPlay';
import delay from '../../../libs/delay';
import { getRandomWord } from '../../../libs/playGame';
import userType from '../../../libs/userType';

type TUsePlay = {
  gameOver: string;
  setGameOver: (value: string) => void;
  addWord: (value: string) => void;
  lastWord: string;
  currentPlayer: string | null;
};
const usePlay = (): TUsePlay => {
  const { state } = useContext(AppContext);

  const [gameOver, setGameOver] = useState<string>('');
  const { lastWord, addWord } = useGamePlay();
  const { computerLost } = useComputerPlay(lastWord, addWord);

  useEffect(() => {
    setGameOver(computerLost);
  }, [computerLost]);

  // TODO: Will be custom hook.
  const play = useCallback(() => {
    delay(() => {
      const answer = getRandomWord();
      addWord(answer.response);
    }, 1000);
  }, [state.currentPlayer]);

  useEffect(() => {
    if (!state.currentPlayer) {
      play();
    }
  }, [state.currentPlayer]);

  return {
    gameOver,
    setGameOver,
    addWord,
    lastWord,
    currentPlayer: userType(state.currentPlayer, state.players),
  };
};

export default usePlay;
