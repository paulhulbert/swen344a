import React, { Component } from 'react';

import { FIREBASE_AUTH_INSTANCE } from "./auth";
import { Redirect } from 'react-router-dom';

import LoadingState from '../components/common/LoadingState';
import { LOGIN_PAGE_ROUTE } from '../constants/routes';
import { Map } from 'immutable';

export default WrappedComponent => {
    class WithAuthentication extends Component {
        state = {
            authFetching: true,
            loggedIn: false,
            providerData: Map(),
        };

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

        componentDidMount() {
            this.unsubscribe = FIREBASE_AUTH_INSTANCE().onAuthStateChanged(user => {
              this.updateAuthState(user);
            });
        }

        componentWillUnmount() {
            this.unsubscribe && this.unsubscribe();
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
            return <LoadingState />
          }
          return (
            <Redirect to={LOGIN_PAGE_ROUTE} />
          )
        }
    }

    return WithAuthentication;
};