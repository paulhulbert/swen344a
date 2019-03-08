import firebase from 'firebase/app';

const config = {
  firebase: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
  },
};

let app = null;

export function initializeApp() {
  if (!app) {
    app = firebase.initializeApp(config.firebase);
  }
}

export function getAppInstance() {
  return app;
}
