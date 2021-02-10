import { useCallback, useContext, useRef, useState } from 'react';

import GameContext from '../context/GameContext';

import { getNextPlayer } from '../controllers/playerController';
import { IPlayerResult } from '../utils/types';
import { TUsePlayer } from './types';

/**
 * A React hook that gets result {@link IPlayerResult} from players and record it as a last action of player.
 *
 * usePlayer hook provides three important callback functions 'play', 'nextPlayer' and 'addWord'.
 *
 * @func usePlayer
 * @memberOf React
 * @return {TUsePlayer} - Returns player actions.
 */
const usePlayer = (): TUsePlayer => {
  const { state, dispatch } = useContext(GameContext);

  // Hosts 'play' Promise resolve.
  const resolveRef = useRef<(value: IPlayerResult) => void>();

  const [lastAction, setLastAction] = useState<IPlayerResult>();

  // Switches between players.
  const nextPlayer = () => {
    const player = getNextPlayer(state.currentPlayer, state.players);

    dispatch({ type: 'currentPlayer', payload: player });
  };

  /** *
   * Waits a new response from user and updates 'lastAction' ONLY if 'addWord' callback
   * is provided with a result {@link IPlayerResult} by players.
   * Saves last action as the Promise resolves.
   *
   * Promise resolve logic extracted for several reasons;
   *    to create a very simple React based event like result-waiting trigger.
   *    to prevent unnecessary renders
   *    to extract promise outside of the hook and delivers it to players as an act of providence.
   *
   * Once 'play' function is triggered, 'addWord' callback already waiting for a response will be reactivated
   * @memberOf usePlayer
   * @function
   * @inner
   */
  const play = async () => {
    const result = await new Promise((resolve: (value: IPlayerResult) => void) => {
      resolveRef.current = resolve;
    });

    setLastAction(result);
  };

  /**
   * This function has only one purpose. Resolves 'play' Promise with the result {@link IPlayerResult}
   * once called from anywhere.
   * @memberOf usePlayer
   * @function
   * @inner
   */
  const addWord = useCallback(
    (result: IPlayerResult) => {
      resolveRef.current?.(result);
    },
    [resolveRef.current],
  );

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
