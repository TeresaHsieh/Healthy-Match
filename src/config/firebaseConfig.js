import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAu5M8SOdRdZjRp6HwRB9LqdkdUyNTvNlg",
  authDomain: "healthy-match.firebaseapp.com",
  databaseURL: "https://healthy-match.firebaseio.com",
  projectId: "healthy-match",
  storageBucket: "healthy-match.appspot.com",
  messagingSenderId: "560759415450",
  appId: "1:560759415450:web:9fc855be631767dc"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const emailProvider = new firebase.auth.EmailAuthProvider();

// module.exports = firebaseConfig;
