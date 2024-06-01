import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBWmJ5FySA6XMdc4QrzvWpGaEeYjdR9rF4',
  authDomain: 'pokedex-fc656.firebaseapp.com',
  databaseURL: 'https://pokedex-fc656.firebaseio.com',
  projectId: 'pokedex-fc656',
  storageBucket: 'pokedex-fc656.appspot.com',
  messagingSenderId: '677803256412',
  appId: '1:677803256412:android:d223815e985a3579961499',
  measurementId: 'G-9Z0XBKEXAMPLE',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase, firestore};
