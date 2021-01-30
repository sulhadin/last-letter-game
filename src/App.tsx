import React, { useState } from 'react';
import './App.scss';
import GamePlay from './presenters/play/GameManager';
import { GameContext } from './context/GameContext';
import { Spoken } from './libs/types';

const initialState: [] = [];

const App: React.FC = () => {
  const [state, setState] = useState<Spoken>(initialState);

  return (
    <div className="last-letter-game-app">
      <GameContext.Provider value={{ state, setState }}>
        <GamePlay />
      </GameContext.Provider>
    </div>
  );
};

export default App;
