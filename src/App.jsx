import React, { PureComponent } from 'react'
import HelloWorld from './components/HelloWorld';
import 'semantic-ui-css/semantic.min.css';

export default class App extends PureComponent {
  render() {
    return (
      <HelloWorld />
    )
  }
}