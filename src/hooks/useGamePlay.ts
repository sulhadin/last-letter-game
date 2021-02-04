import { useContext, useEffect, useMemo, useState } from 'react';

import GameContext from '../context/GameContext';

import useComputerPlay from './useComputerPlay';
import playerType from '../libs/playerType';
import useAutoPlay from './useAutoPlay';
import textToSpeech from '../controllers/textToSpeech';
import useGameController from './useGameController';

type TGamePlay = {
  gameOver: string | undefined;
  setGameOver: (value: string) => void;
  addWord: (value: string) => void;
  lastWord: string;
  currentPlayerType: string | null;
};

const useGamePlay = (): TGamePlay => {
  const { state } = useContext(GameContext);

  const [gameOver, setGameOver] = useState<string>();

  const { notValidMessage, lastWord, addWord, newPlayer } = useGameController();
  const { word: autoPlayerWord } = useAutoPlay(newPlayer);
  const { computerLost, word: computerWord } = useComputerPlay({
    lastWord,
    player: newPlayer,
    preferences: state.preferences,
    players: state.players,
    game: state.game,
  });

  useEffect(() => {
    if (autoPlayerWord) {
      addWord(autoPlayerWord);
    }
  }, [autoPlayerWord]);

  //  Read the response coming from computer.
  useEffect(() => {
    if (computerWord) {
      addWord(computerWord);

      const speak = textToSpeech(computerWord);
      speak();
    }
  }, [computerWord]);

  useEffect(() => {
    setGameOver(computerLost);
  }, [computerLost]);

  useEffect(() => {
    setGameOver(notValidMessage);
  }, [notValidMessage]);

  const currentPlayerType = useMemo(() => playerType(state.currentPlayer, state.players), [state]);

  return {
    gameOver,
    setGameOver,
    addWord,
    lastWord,
    currentPlayerType,
  };
};

export default useGamePlay;
