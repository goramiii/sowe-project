// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0mJ5rSOzfdUn7jEhRc6gRs3AGIgO9vf0",
  authDomain: "test-b43c4.firebaseapp.com",
  projectId: "test-b43c4",
  storageBucket: "test-b43c4.appspot.com",
  messagingSenderId: "813816754016",
  appId: "1:813816754016:web:6f68681be6923cdd05f805",
  measurementId: "G-YZ1VLKDJCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics
const analytics = getAnalytics(app);

export { db, analytics };
