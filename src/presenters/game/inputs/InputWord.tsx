import React, { memo, useContext, useEffect } from 'react';

import GameContext from '../../../context/GameContext';

import { getPlayerType } from '../../../controllers/playerController';
import useAIPlayers from '../../../hooks/useAIPlayers';
import { IInput } from '../../../utils/types';
import Inputs from './Inputs';

/**
 * Users are managed in the InputWord, Every user takes it's turn as 'playerType' that means 'currentPlayer' changes.
 *
 * AI players and Human player have been taken into account; however, players can vary. Might need a minor refactor to implement multiplayer.
 * @param {function} onNewWord - Callback function listening new word.
 * @param {string} placeholder - A default placeholder.
 * @constructor
 * @return {React.FC<IInput>} Input component.
 */
const InputWord: React.FC<IInput> = ({ onNewWord, placeholder }) => {
  const { state } = useContext(GameContext);
  const [disabled, setDisabled] = React.useState<boolean>(false);

  // Gets current player type immediately to determine which player should be the next.
  const playerType = getPlayerType(state.currentPlayer, state.players);

  const { response, play } = useAIPlayers(playerType, state.currentWord);

  useEffect(() => {
    onNewWord(response);
  }, [response]);

  useEffect(() => {
    // Any user can later log into the app and get a unique id.
    // currentUser is planned to represent that unique id; so, more then one user can sign in.
    // for now, if currentUser is not equals to currentPlayer whom is to play next, it is considered ai.
    // with a small refactor, human players can be implemented..
    const isAi = state.currentPlayer !== state.currentUser;
    setDisabled(isAi);

    if (isAi) {
      play();
    }
  }, [state.currentPlayer]);

  return <Inputs onNewWord={onNewWord} placeholder={placeholder} disabled={disabled} />;
};

export default memo(InputWord);
