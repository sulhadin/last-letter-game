import { useContext, useEffect, useMemo, useState } from 'react';

import GameContext from '../context/GameContext';

import { getPlayerType } from '../controllers/playerController';
import useWord from './useWord';
import usePlayer from './usePlayer';
import { TGamePlay } from './types';

/**
 * A React hook that communicate {@link useWord} and {@link usePlayer} hooks with each other.
 * Also evaluates the responses coming from them.
 *
 * @func useGamePlay
 * @memberOf React
 * @return {TGamePlay}
 */
const useGamePlay = (): TGamePlay => {
  const { state, dispatch } = useContext(GameContext);

  const [lostMessage, setLostMessage] = useState<string>('');

  const { saveWord, wordResponse } = useWord();
  const { player, addWord, lastAction } = usePlayer();

  /**
   * Step #1
   * Triggers 'play' function of 'usePlayer' for a new game as soon as 'currentPlayer' changes.
   * After triggers, a new word is expected from players.
   *
   * @inner
   */
  useEffect(() => {
    player.play();
  }, [state.currentPlayer]);

  // Step #2, Listen last action from 'usePlayer', save response if currentPlayer played.
  /**
   * Step #2
   * Listens the 'lastAction' of 'usePlayer' and saves the last action which contains new spoken word if players played.
   *
   * @inner
   */
  useEffect(() => {
    if (lastAction?.played) {
      saveWord(lastAction);
    }
  }, [lastAction]);

  /**
   * Step #3
   * Listens word saving response and switch player if response is valid.
   * Deactivates timer if the response is invalid.
   *
   * @inner
   */
  useEffect(() => {
    if (wordResponse?.valid) {
      player.nextPlayer();
    }

    if (wordResponse?.invalid) {
      setLostMessage(wordResponse.result);
      dispatch({ type: 'timer', payload: { active: false } });
    }
  }, [wordResponse]);

  const currentPlayerType = useMemo(() => getPlayerType(state.currentPlayer, state.players), [
    state,
  ]);

  return {
    lostMessage,
    addWord,
    currentPlayerType,
  };
};

export default useGamePlay;
