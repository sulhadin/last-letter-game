import React, { useState } from 'react';
import { Spoken } from '../libs/types';
import { GameContext } from './GameContext';

const GameProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<Spoken>([]);

  return <GameContext.Provider value={{ state, setState }}>{children}</GameContext.Provider>;
};

export default GameProvider;
