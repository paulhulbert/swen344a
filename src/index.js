import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import firebaseApp from './utils/firebase';
import 'semantic-ui-css/semantic.min.css';
import { fetchStocks } from './utils/stocks/stocksUtils';

fetchStocks(console.log);

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);