import { useContext, useEffect } from 'react';
import GameContext from '../context/GameContext';
import useWordController from './useWordController';
import usePlayerSwitcher from './usePlayerSwitcher';
import { TPlayer } from '../libs/types';

type TGameController = {
  notValidMessage: string | undefined;
  addWord: (value: string) => void;
  lastWord: string;
  newPlayer: TPlayer;
};

const useGameController = (): TGameController => {
  const { state, dispatch } = useContext(GameContext);

  const { notValidMessage, lastWord, addWord, gameData } = useWordController({
    players: state.players,
    currentPlayer: state.currentPlayer,
    preferences: state.preferences,
    game: state.game,
  });

  const { newPlayer } = usePlayerSwitcher(lastWord);

  useEffect(() => {
    // Alternatively: To be investigated.
    // const setCurrentPlayerTest = setCurrentPlayerAction(dispatch);
    dispatch({ type: 'currentPlayer', payload: newPlayer });
  }, [newPlayer]);

  useEffect(() => {
    if (gameData) {
      dispatch({ type: 'game', payload: gameData });
    }
  }, [gameData]);

  return {
    notValidMessage,
    lastWord,
    addWord,
    newPlayer,
  };
};

export default useGameController;
