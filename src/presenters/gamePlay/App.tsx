import React from 'react';
import './App.scss';
import GamePlay from './GamePlay/GamePlay';

const App: React.FC = () => {
  return (
    <div className="last-letter-game-app">
      <GamePlay />
    </div>
  );
};

export default App;
