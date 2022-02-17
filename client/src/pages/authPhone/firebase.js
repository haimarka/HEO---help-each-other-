// import * as firebase from "firebase";
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyA511tFc0a5Ejmqrdq1wdjjDMrE3f1J9pU",
    authDomain: "phone-auth-9a71f.firebaseapp.com",
    projectId: "phone-auth-9a71f",
    storageBucket: "phone-auth-9a71f.appspot.com",
    messagingSenderId: "821853373989",
    appId: "1:821853373989:web:a8149a626b02d47435e1cc"
  };


const app = initializeApp(firebaseConfig);

export const authentucation =getAuth(app);