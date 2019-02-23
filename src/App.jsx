import React, { PureComponent } from 'react'
import HelloWorld from './components/HelloWorld';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

export default class App extends PureComponent {
  render() {
    return (
      <Router>
        <Route exact path="/" component={HelloWorld} />
      </Router>
    )
  }
}