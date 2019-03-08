import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeApp } from './utils/firebase';
import 'semantic-ui-css/semantic.min.css';

initializeApp();

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <App />,
  document.getElementById('app'),
);
