import React, { useContext } from 'react';
import './App.scss';
import GamePlay from './GamePlay/GamePlay';
import { AppContext } from '../../context/reducers';

const App: React.FC = () => {
  const { state } = useContext(AppContext);

  if (!Object.keys(state.players).length) {
    return <>Loading...</>;
  }

  return (
    <div className="last-letter-game-app">
      <GamePlay gameStarted={true} />
    </div>
  );
};

export default App;
