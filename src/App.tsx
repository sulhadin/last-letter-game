import React, { useState } from 'react';
import './App.scss';
import GamePlay from './presenters/play/GamePlay';
import GameContext from './context/GameContext';
import { PlayerEnum } from './libs/Players';
import { Spoken } from './libs/types';

type State = {
  spoken: Spoken;
  player: PlayerEnum;
};
const App: React.FC = () => {
  const [state, setState] = useState<State>({ spoken: [], player: PlayerEnum.Player });

  return (
    <div className="last-letter-game-app">
      <GameContext.Provider value={[state, setState]}>
        <GamePlay />
      </GameContext.Provider>
    </div>
  );
};

export default App;
