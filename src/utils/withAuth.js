import React, { Component } from 'react';
import Delay from 'react-delay';

import firebase from './firebase';
import {getAuth, twitterOAuth} from "./auth";

export default WrappedComponent => {
    class WithAuthentication extends Component {
        state = {
            providerData: []
        };

        checkAuthStatusAndRedirect(user) {
            if (user) {
                this.setState({ providerData: user.providerData });
            } else {
                firebase.auth().signInWithRedirect(twitterOAuth());
            }
        }

        componentDidMount() {
            this.unsubscribe = getAuth().onAuthStateChanged(user => {
                this.checkAuthStatusAndRedirect(user);
            });
        }

        componentWillUnmount() {
            this.unsubscribe && this.unsubscribe();
        }

        render() {
            return this.state.providerData.length > 0 ? (
                <WrappedComponent
                    {...this.props}
                    providerData={this.state.providerData}
                />
            ) : (
                <Delay wait={250}>
                    <p>Loading...</p>
                </Delay>
            );
        }
    }

    return WithAuthentication;
};