import { TPlayerActions } from './types';

export const setCurrentPlayerAction = (dispatch: (value: TPlayerActions) => void) => {
  return (player: string | null) => dispatch({ type: 'currentPlayer', payload: player });
};
