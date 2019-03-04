import React, { Component } from 'react';

import { FIREBASE_AUTH_INSTANCE } from "./auth";
import { Redirect } from 'react-router-dom';

import LoadingState from '../components/common/LoadingState';
import { LOGIN_PAGE_ROUTE } from '../constants/routes';
import { fromJS, Map } from 'immutable';

export default WrappedComponent => {
    class WithAuthentication extends Component {
        state = {
            authFetching: true,
            providerData: Map(),
        };

        updateAuthState(providerData) {
          if (providerData && providerData.size) {
            this.setState({
              authFetching: false,
              providerData: providerData.first(),
            });
          } else {
            this.setState({
              authFetching: false,
              providerData: Map(),
            });
          }
        }

        componentDidMount() {
            this.unsubscribe = FIREBASE_AUTH_INSTANCE().onAuthStateChanged(user => {
              this.updateAuthState(fromJS(user.providerData));
            });
        }

        componentWillUnmount() {
            this.unsubscribe && this.unsubscribe();
        }

        render() {
          if (this.state.providerData.size > 0) {
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