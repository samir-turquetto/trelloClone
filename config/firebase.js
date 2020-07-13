import * as firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBMazrCTKpt5pDHJLhV9zIsqyEqRGgmZV0",
  authDomain: "trelloclone-8b5a6.firebaseapp.com",
  databaseURL: "https://trelloclone-8b5a6.firebaseio.com",
  projectId: "trelloclone-8b5a6",
  storageBucket: "trelloclone-8b5a6.appspot.com",
  messagingSenderId: "1044321817537",
  appId: "1:1044321817537:web:56153f682c486f51451540",
  measurementId: "G-0N42HL4E50"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.firestore();