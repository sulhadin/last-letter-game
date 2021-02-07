import { useContext, useEffect, useMemo, useState } from 'react';
import GameContext from '../context/GameContext';

import getPlayer from '../libs/getPlayer';
import useWordController from './useWordController';
import usePlayerController from './usePlayerController';
import { IPlayerResult } from '../libs/types';

type TGamePlay = {
  lostMessage: string;
  addWord: (value: IPlayerResult) => void;
  currentPlayerType: string | null;
};

const useGamePlay = (): TGamePlay => {
  const { state, dispatch } = useContext(GameContext);

  const [lostMessage, setLostMessage] = useState<string>('');

  const { saveWord, wordResponse } = useWordController();
  const { player, addWord, lastAction } = usePlayerController();

  // Step #1, Listen last action, save response if played.
  useEffect(() => {
    if (lastAction?.played) {
      saveWord(lastAction);
    }
  }, [lastAction]);

  // Step #2 Listen word response, switch player if valid.
  useEffect(() => {
    if (wordResponse?.valid) {
      player.nextPlayer();
    }

    if (wordResponse?.invalid) {
      setLostMessage(wordResponse.result);
      dispatch({ type: 'timer', payload: { active: false } });
    }
  }, [wordResponse, state.timer.timeIsUp]);

  // Step #3 Play again with next user.
  useEffect(() => {
    player.play();
  }, [state.currentPlayer]);

  const currentPlayerType = useMemo(() => getPlayer(state.currentPlayer, state.players), [state]);

  return {
    lostMessage,
    addWord,
    currentPlayerType,
  };
};

export default useGamePlay;
