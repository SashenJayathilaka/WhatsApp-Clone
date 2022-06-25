import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAP2T9KzseJqjOc5aP2FfiueCSfS9htvLc",
    authDomain: "whatsapp-clone-2c5b5.firebaseapp.com",
    projectId: "whatsapp-clone-2c5b5",
    storageBucket: "whatsapp-clone-2c5b5.appspot.com",
    messagingSenderId: "202132322140",
    appId: "1:202132322140:web:9db33e540ec193e33ef399",
    measurementId: "G-P4KPD5MDH3"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;