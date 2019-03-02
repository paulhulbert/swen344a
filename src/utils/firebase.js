import firebase from 'firebase/app';

const config = {
  firebase: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
  }
};

const app = firebase.initializeApp(config.firebase);

export default app;