import firebase from 'firebase/app';
import 'firebase/auth'

export const getAuth = () => {
    return firebase.auth();
};

export const twitterOAuth = () => {
    return new firebase.auth.TwitterAuthProvider();
};