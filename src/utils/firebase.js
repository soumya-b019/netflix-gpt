// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBF-33mQyrrcI_P5ot7C7ukbQ1KMRCcDBs",
  authDomain: "netflixgpt-10688.firebaseapp.com",
  projectId: "netflixgpt-10688",
  storageBucket: "netflixgpt-10688.appspot.com",
  messagingSenderId: "870122660267",
  appId: "1:870122660267:web:c6e3b9c88208536f8f72ee",
  measurementId: "G-8Z0FB7GS6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();