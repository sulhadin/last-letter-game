import { useCallback, useContext, useRef, useState } from 'react';

import GameContext from '../context/GameContext';

import { getNextPlayer } from '../controllers/playerController';
import { IPlayerResult } from '../utils/types';
import { TUsePlayer } from './types';

const usePlayer = (): TUsePlayer => {
  const { state, dispatch } = useContext(GameContext);

  const resolveRef = useRef<(value: IPlayerResult) => void>();

  const [lastAction, setLastAction] = useState<IPlayerResult>();

  const nextPlayer = useCallback(() => {
    const player = getNextPlayer(state.currentPlayer, state.players);

    dispatch({ type: 'currentPlayer', payload: player });
  }, [state.currentPlayer]);

  const play = useCallback(async () => {
    const result = await new Promise((resolve: (value: IPlayerResult) => void) => {
      resolveRef.current = resolve;
    });

    setLastAction(result);
  }, [state.currentPlayer]);

  const addWord = (result: IPlayerResult) => {
    resolveRef.current?.(result);
  };

  return {
    player: {
      play,
      nextPlayer,
    },
    addWord,
    lastAction,
  };
};

export default usePlayer;
