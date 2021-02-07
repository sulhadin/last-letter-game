import React, { memo, useContext, useEffect, useMemo } from 'react';

import GameContext from '../../../context/GameContext';

import { getPlayer } from '../../../controllers/playerController';
import useAIPlayers from '../../../hooks/useAIPlayers';
import { IInput } from '../../../utils/types';
import Inputs from './Inputs';

const InputWord: React.FC<IInput> = ({ onNewWord, placeholder }) => {
  const { state } = useContext(GameContext);
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const playerType = useMemo(() => getPlayer(state.currentPlayer, state.players), [
    state.currentPlayer,
  ]);
  const { response, play } = useAIPlayers(playerType, state.currentWord);

  useEffect(() => {
    onNewWord(response);
  }, [response]);

  useEffect(() => {
    const isAi = state.currentPlayer !== state.currentUser;
    setDisabled(isAi);

    if (isAi) {
      play();
    }
  }, [state.currentPlayer]);

  return <Inputs onNewWord={onNewWord} placeholder={placeholder} disabled={disabled} />;
};

export default memo(InputWord);
