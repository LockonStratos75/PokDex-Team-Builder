// Import necessary modules from the Firebase package for React Native
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

// Firebase configuration object containing the required keys and identifiers
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY', // Replace with your Firebase API key
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com', // Replace with your Firebase Auth domain
  databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com', // Replace with your Firebase database URL
  projectId: 'YOUR_PROJECT_ID', // Replace with your Firebase project ID
  storageBucket: 'YOUR_PROJECT_ID.appspot.com', // Replace with your Firebase storage bucket
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID', // Replace with your Firebase messaging sender ID
  appId: 'YOUR_APP_ID', // Replace with your Firebase app ID
  measurementId: 'YOUR_MEASUREMENT_ID', // (Optional) Replace with your Firebase measurement ID
};

// Initialize Firebase app if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export the firebase and firestore instances for use in other parts of the app
export { firebase, firestore };
