import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

if (module.hot) {
  module.hot.accept(() => {
    // Do something with the updated library module...
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
