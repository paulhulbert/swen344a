import React, { PureComponent } from 'react'
import HelloWorld from './components/HelloWorld';
import 'semantic-ui-css/semantic.min.css';
import { firebase, auth } from './utils/index';

export default class App extends PureComponent {
  render() {
    firebase.auth().signInWithRedirect(auth.twitterOAuth());
    return (
      <HelloWorld />
    )
  }
}