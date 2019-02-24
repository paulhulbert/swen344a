import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import 'semantic-ui-css/semantic.min.css';

import {
  fetchFullFiveDayForecastForZip,
} from './utils/weather/weatherUtils';

fetchFullFiveDayForecastForZip(14623, console.log);

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);