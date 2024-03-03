// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCp68KF8hVrYOckwRWWkPjV7LNLCZrz634",
  authDomain: "dummy1-f150a.firebaseapp.com",
  databaseURL:
    "https://dummy1-f150a-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "dummy1-f150a",
  storageBucket: "dummy1-f150a.appspot.com",
  messagingSenderId: "1026454168866",
  appId: "1:1026454168866:web:0acbe6d261f36d9f5af17b",
  measurementId: "G-8Y0DELEDH6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
