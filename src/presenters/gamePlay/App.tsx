import React, { useState } from 'react';
import './App.scss';
import GamePlay from './GamePlay/GamePlay';

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  return (
    <div className="last-letter-game-app">
      <GamePlay gameStarted={gameStarted} />
    </div>
  );
};

export default App;
