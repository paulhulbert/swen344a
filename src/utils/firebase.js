import firebase from 'firebase/app';
import 'firebase/auth';
//import 'firebase/database';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBwyxoKLx5ybSmVM5pB1fFBVAz6bX1qMk8",
    authDomain: "https://web-engineering-spring-2019.firebaseapp.com",
    //databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
});

export default app;