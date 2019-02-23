import firebase from 'firebase/app';

export const getAuth = () => {
    return firebase.auth();
};

export const twitterOAuth = () => {
    return new firebase.auth.TwitterAuthProvider();
};