import React, { useReducer } from 'react';
import { gameReducer, initialState } from '../store/reducer';
import GameContext from './GameContext';

const GameProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
};

export default GameProvider;
