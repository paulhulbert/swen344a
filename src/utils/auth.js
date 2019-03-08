import firebase from 'firebase/app';
import 'firebase/auth';

export const FIREBASE_AUTH_INSTANCE = firebase.auth;

export const OAUTH_PROVIDER = new firebase.auth.TwitterAuthProvider();
