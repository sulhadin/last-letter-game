import { useCallback, useContext, useEffect, useState } from 'react';
import GameContext from '../context/GameContext';
import useGamePlay from './useGamePlay';
import useComputerPlay from './useComputerPlay';
import delay from '../libs/delay';
import { getRandomWord } from '../controllers/playGame';
import userType from './helpers/userType';

type TUsePlay = {
  gameOver: string;
  setGameOver: (value: string) => void;
  addWord: (value: string) => void;
  lastWord: string;
  currentPlayer: string | null;
};
const usePlay = (): TUsePlay => {
  const { state } = useContext(GameContext);
  const [gameOver, setGameOver] = useState<string>('');
  const { notValidMessage, lastWord, addWord } = useGamePlay();
  const { computerLost } = useComputerPlay(lastWord, addWord);

  useEffect(() => {
    setGameOver(computerLost);
  }, [computerLost]);

  useEffect(() => {
    setGameOver(notValidMessage);
  }, [notValidMessage]);

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
