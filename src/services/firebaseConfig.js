// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVlXoOImKZuT53ol6wXMhtj8vbb2PQQJw",
  authDomain: "worldrecipes-78b90.firebaseapp.com",
  projectId: "worldrecipes-78b90",
  storageBucket: "worldrecipes-78b90.firebasestorage.app",
  messagingSenderId: "793480064416",
  appId: "1:793480064416:web:c14cf96faad41b0dc7c8c5",
  measurementId: "G-YY865BNJGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
