import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyD0uG6QpiBPV8VKF6oFxOEEk9QXOMeYibU",
    authDomain: "chatapp-b6af9.firebaseapp.com",
    projectId: "chatapp-b6af9",
    storageBucket: "chatapp-b6af9.appspot.com",
    messagingSenderId: "376948030028",
    appId: "1:376948030028:web:1053d3cb5c6f9dd645d2e9"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;