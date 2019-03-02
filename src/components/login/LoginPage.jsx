import React, { PureComponent } from 'react';
import LoginButton from './LoginButton';
import { INDEX_PAGE_ROUTE } from '../../constants/routes';
import { Redirect } from 'react-router-dom';
import {
  FIREBASE_AUTH_INSTANCE,
  OAUTH_PROVIDER,
} from '../../utils/auth';
import { Header, Icon, Grid } from 'semantic-ui-react'

export default class LoginPage extends PureComponent {

  constructor() {
    super();
    this.handleAttemptLogIn = this.handleAttemptLogIn.bind(this);
    this.handleUpdateUserLoggedIn = this.handleUpdateUserLoggedIn.bind(this);
    this.state = {
      loggedIn: false,
      loggingIn: false,
    }
  }

  handleUpdateUserLoggedIn(loggedIn) {
    this.setState({
      loggedIn: loggedIn,
      loggingIn: false,
    });
  }

  handleAttemptLogIn() {
    this.setState({
      loggingIn: true,
    })
    FIREBASE_AUTH_INSTANCE().signInWithPopup(OAUTH_PROVIDER).then(() => {
      this.handleUpdateUserLoggedIn(true);
    }).catch(() => {
      this.handleUpdateUserLoggedIn(false);
    });
  }

  componentDidMount() {
    this.unsubscribe = FIREBASE_AUTH_INSTANCE().onAuthStateChanged(user => {
      this.handleUpdateUserLoggedIn(!!user);
    });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  renderPageHeader() {
    return (
      <Header
        as="h2"
        icon={true}
      >
        <Icon
          name="twitter"
          color="blue"
        />
        Twitter Log In
        <Header.Subheader>Please log in with Twitter to access SÜT</Header.Subheader>
      </Header>
    );
  }

  renderLoginButton() {
    return (
      <LoginButton
        loggedIn={this.state.loggedIn}
        loggingIn={this.state.loggingIn}
        attemptLogin={this.handleAttemptLogIn}
      />
    );
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to={INDEX_PAGE_ROUTE} />
    }
    return (
      <Grid
        centered={true}
        columns={1}
      >
        <Grid.Row>
          {this.renderPageHeader()}
        </Grid.Row>
        <Grid.Row>
          {this.renderLoginButton()}
        </Grid.Row>
      </Grid>
    )
  }

}