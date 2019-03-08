import React, { PureComponent } from 'react';
import { Button } from 'semantic-ui-react';
import { FIREBASE_AUTH_INSTANCE } from '../../utils/auth';

export default class LogOutButton extends PureComponent {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    };
    this.handleUpdateUserLoggedIn = this.handleUpdateUserLoggedIn.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = FIREBASE_AUTH_INSTANCE().onAuthStateChanged((user) => {
      this.handleUpdateUserLoggedIn(user);
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleUpdateUserLoggedIn(user) {
    this.setState({
      loggedIn: !!user,
    });
  }

  handleLogOut() {
    FIREBASE_AUTH_INSTANCE().signOut();
  }

  render() {
    return (
      <Button
        disabled={!this.state.loggedIn}
        inverted
        onClick={this.handleLogOut}
      >
        Log Out
      </Button>
    );
  }
}
