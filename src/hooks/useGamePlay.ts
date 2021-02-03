import { useContext, useEffect, useMemo, useState } from 'react';

import GameContext from '../context/GameContext';

import useComputerPlay from './useComputerPlay';
import playerType from '../libs/playerType';
import useCountDown from './useCountDown';
import useAutoPlay from './useAutoPlay';
import textToSpeech from '../controllers/textToSpeech';
import useGameController from './useGameController';

type TGamePlay = {
  gameOver: string | undefined;
  setGameOver: (value: string) => void;
  addWord: (value: string) => void;
  lastWord: string;
  timer: number;
  currentPlayerType: string | null;
};

const useGamePlay = (): TGamePlay => {
  const { state } = useContext(GameContext);

  const [gameOver, setGameOver] = useState<string>();

  const [timer, timeIsUp, restart, setIsActive] = useCountDown(10);
  const { notValidMessage, lastWord, addWord, newPlayer } = useGameController();
  const { word: autoPlayerWord } = useAutoPlay(newPlayer);

  const computerProps = useMemo(
    () => ({
      lastWord,
      player: newPlayer,
      preferences: state.preferences,
      players: state.players,
      game: state.game,
    }),
    [state],
  );

  const { computerLost, word: computerWord } = useComputerPlay(computerProps);

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
    if (timeIsUp) {
      setGameOver('Time is up!');
    }
  }, [timeIsUp]);

  useEffect(() => {
    restart();
  }, [newPlayer]);

  useEffect(() => {
    // TODO: Finish panel should appear.
    setIsActive(false);
  }, [gameOver]);

  useEffect(() => {
    setGameOver(computerLost);
  }, [computerLost]);

  useEffect(() => {
    setGameOver(notValidMessage);
  }, [notValidMessage]);

  return {
    gameOver,
    setGameOver,
    addWord,
    lastWord,
    timer,
    currentPlayerType: playerType(state.currentPlayer, state.players),
  };
};

export default useGamePlay;
