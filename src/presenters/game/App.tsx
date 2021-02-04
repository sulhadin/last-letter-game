import React, { useContext, useState } from 'react';
import GameContext from '../../context/GameContext';

import GamePlay from './gamePlay/GamePlay';
import GamePreferences from './preferences/GamePreferences';

import './App.scss';

const App: React.FC = () => {
  const { state } = useContext(GameContext);

  const [startGame, setStartGame] = useState(false);

  if (!startGame) {
    return (
      <div className="last-letter-game-app">
        <GamePreferences setStartGame={setStartGame} />
      </div>
    );
  }

  if (!Object.keys(state.players).length) {
    return <>Loading...</>;
  }

  return (
    <div className="last-letter-game-app">
      <GamePlay />
    </div>
  );
};

export default App;
