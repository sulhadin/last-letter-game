import { useContext, useEffect, useMemo, useState } from 'react';

import GameContext from '../context/GameContext';

import { getPlayerType } from '../controllers/playerController';
import useWord from './useWord';
import usePlayer from './usePlayer';
import { TGamePlay } from './types';

const useGamePlay = (): TGamePlay => {
  const { state, dispatch } = useContext(GameContext);

  const [lostMessage, setLostMessage] = useState<string>('');

  const { saveWord, wordResponse } = useWord();
  const { player, addWord, lastAction } = usePlayer();

  // Step #1 Play as soon as 'currentPlayer' changes.
  useEffect(() => {
    player.play();
  }, [state.currentPlayer]);

  // Step #2, Listen last action from usePlayer, save response if currentPlayer played.
  useEffect(() => {
    if (lastAction?.played) {
      saveWord(lastAction);
    }
  }, [lastAction]);

  // Step #3 Listen word saving response and switch player if response is valid.
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
