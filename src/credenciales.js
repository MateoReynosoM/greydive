// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHFsrB6T_sJQ5kNSXfjRSIet3q7WpwkGI",
  authDomain: "greydive-96b50.firebaseapp.com",
  projectId: "greydive-96b50",
  storageBucket: "greydive-96b50.appspot.com",
  messagingSenderId: "243524370182",
  appId: "1:243524370182:web:76a7f378c36ac75f1d2887",
  measurementId: "G-MWSVHTZEB2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);