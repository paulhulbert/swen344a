import firebase from 'firebase/app';

const app = firebase.initializeApp({
  apiKey: "AIzaSyBwyxoKLx5ybSmVM5pB1fFBVAz6bX1qMk8",
  authDomain: "web-engineering-spring-2019.firebaseapp.com",
  databaseURL: "https://web-engineering-spring-2019.firebaseio.com/",
});

export default app;