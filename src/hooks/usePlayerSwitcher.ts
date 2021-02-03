import { useState, useEffect, useContext, useCallback } from 'react';
import GameContext from '../context/GameContext';
import nextPlayer from './helpers/nextPlayer';
import { TPlayer } from '../libs/types';

export type IPlayerSwitcher = {
  newPlayer: TPlayer;
};

const usePlayerSwitcher = (word: string): IPlayerSwitcher => {
  const { state } = useContext(GameContext);
  const [newPlayer, setNewPlayer] = useState<TPlayer>();

  const switchPlayer = useCallback(() => {
    const player = nextPlayer(state.currentPlayer, state.players);
    setNewPlayer(player);
  }, [state]);

  useEffect(() => {
    if (word) {
      switchPlayer();
    }
  }, [word]);

  return { newPlayer };
};

export default usePlayerSwitcher;
