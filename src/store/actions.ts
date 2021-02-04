import { TPlayerActions } from './types';
import { TPlayer } from '../libs/types';

export const setCurrentPlayerAction = (
  dispatch: (value: TPlayerActions) => void,
): ((player: TPlayer) => void) => {
  return (player: TPlayer) => dispatch({ type: 'currentPlayer', payload: player });
};

export const setGameDataAction = (
  dispatch: (value: TPlayerActions) => void,
): ((player: TPlayer) => void) => {
  return (player: TPlayer) => dispatch({ type: 'currentPlayer', payload: player });
};
