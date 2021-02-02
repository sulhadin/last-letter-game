import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/reducers';

import GamePlay from './GamePlay/GamePlay';
import GamePreferences from './Preferences/GamePreferences';

import './App.scss';

const App: React.FC = () => {
  const { state } = useContext(AppContext);

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
