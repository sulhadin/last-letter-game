import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './presenters/game/App';
import { GameProvider } from './context';

ReactDOM.render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
