import React, { Component } from 'react';

import { FIREBASE_AUTH_INSTANCE } from "./auth";
import { Redirect } from 'react-router-dom';

import LoadingState from '../components/common/LoadingState';
import { LOGIN_PAGE_ROUTE } from '../constants/routes';

export default WrappedComponent => {
    class WithAuthentication extends Component {
        state = {
            authFetching: true,
            providerData: [],
        };

        checkAuthStatusAndRedirect(user) {
            if (user) {
                this.setState({
                  authFetching: false,
                  providerData: user.providerData,
                });
            } else {
              this.setState({
                authFetching: false,
                providerData: [],
              });
            }
        }

        componentDidMount() {
            this.unsubscribe = FIREBASE_AUTH_INSTANCE().onAuthStateChanged(user => {
                this.checkAuthStatusAndRedirect(user);
            });
        }

        componentWillUnmount() {
            this.unsubscribe && this.unsubscribe();
        }

        render() {
          if (this.state.providerData.length > 0) {
            return (
              <WrappedComponent
                {...this.props}
                providerData={this.state.providerData}
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