import React, { PureComponent } from 'react';

import { Redirect } from 'react-router-dom';
import { Map } from 'immutable';
import { FIREBASE_AUTH_INSTANCE } from '../../utils/auth';

import LoadingState from '../common/LoadingState';
import { LOGIN_PAGE_ROUTE } from '../../constants/routes';

export default (WrappedComponent) => {
  class AuthWrapper extends PureComponent {
    state = {
      authFetching: true,
      loggedIn: false,
      providerData: Map(),
    };

    componentDidMount() {
      this.unsubscribe = FIREBASE_AUTH_INSTANCE().onAuthStateChanged((user) => {
        this.updateAuthState(user);
      });
    }

    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    }

    updateAuthState(user) {
      const loggedIn = !!user;
      if (user && user.providerData && user.providerData.length) {
        const providerData = Map(user.providerData[0]);
        this.setState({
          authFetching: false,
          loggedIn,
          providerData,
        });
      } else {
        this.setState({
          authFetching: false,
          loggedIn,
          providerData: Map(),
        });
      }
    }

    render() {
      if (this.state.loggedIn) {
        return (
          <WrappedComponent
            {...this.props}
            authProviderData={this.state.providerData}
          />
        );
      }
      if (this.state.authFetching) {
        return <LoadingState />;
      }
      return (
        <Redirect to={LOGIN_PAGE_ROUTE} />
      );
    }
  }

  return AuthWrapper;
};
