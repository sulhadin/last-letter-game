import React from 'react';
import './App.scss';
import Greeting from './presenters/Greeting';
import Play from './presenters/play/Play';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Last letter game</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Greeting />
      <Play />
    </div>
  );
};

export default App;
