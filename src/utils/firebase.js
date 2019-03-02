import firebase from 'firebase/app';

const config = {
  firebase: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
  }
};

const app = firebase.initializeApp(config.firebase);

export default app;