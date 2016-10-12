import firebase from 'firebase';
// Initialize Firebase
const initFirebase = () => {
  let first = true;
  let db = null;
  return () => {
    if (first) {
      first = false;
      const config = {
        apiKey: 'AIzaSyDnhNujTGx-stPRmfg7H1uIL7upFvhMXvQ',
        authDomain: 'raccoon-c86bb.firebaseapp.com',
        databaseURL: 'https://raccoon-c86bb.firebaseio.com',
        storageBucket: 'raccoon-c86bb.appspot.com',
        messagingSenderId: '198553806411',
      };
      firebase.initializeApp(config);
      db = firebase.database();
      return db;
    }
    return db;
  };
};
const getDB = initFirebase();
export const db = getDB();
export const timeStamp = firebase.database.ServerValue.TIMESTAMP;
