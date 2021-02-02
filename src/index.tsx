import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './presenters/game/App';
import { GameProvider } from './context';

if (module.hot) {
  module.hot.accept(() => {
    // Do something with the updated library module...
  });
}

ReactDOM.render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
