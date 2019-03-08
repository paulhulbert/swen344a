import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, Icon, Grid } from 'semantic-ui-react';
import LoginButton from './LoginButton';
import { INDEX_PAGE_ROUTE } from '../../constants/routes';
import {
  FIREBASE_AUTH_INSTANCE,
  OAUTH_PROVIDER,
} from '../../utils/auth';

export default class LoginPage extends PureComponent {
  constructor() {
    super();
    this.handleAttemptLogIn = this.handleAttemptLogIn.bind(this);
    this.handleUpdateUserLoggedIn = this.handleUpdateUserLoggedIn.bind(this);
    this.state = {
      loggedIn: false,
      loggingIn: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = FIREBASE_AUTH_INSTANCE().onAuthStateChanged((user) => {
      this.handleUpdateUserLoggedIn(!!user);
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleUpdateUserLoggedIn(loggedIn) {
    this.setState({
      loggedIn,
      loggingIn: false,
    });
  }

  handleAttemptLogIn() {
    this.setState({
      loggingIn: true,
    });
    FIREBASE_AUTH_INSTANCE().signInWithPopup(OAUTH_PROVIDER).then(() => {
      this.handleUpdateUserLoggedIn(true);
    }).catch(() => {
      this.handleUpdateUserLoggedIn(false);
    });
  }

  renderPageHeader() {
    return (
      <Header
        as="h2"
        icon
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
      return <Redirect to={INDEX_PAGE_ROUTE} />;
    }
    return (
      <Grid
        centered
        columns={1}
      >
        <Grid.Row>
          {this.renderPageHeader()}
        </Grid.Row>
        <Grid.Row>
          {this.renderLoginButton()}
        </Grid.Row>
      </Grid>
    );
  }
}
