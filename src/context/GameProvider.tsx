import React, { useReducer } from 'react';
import { AppContext, gameReducer, initialState } from './reducers';

const GameProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export default GameProvider;
