// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyB7B__YULDUdqDjDUUa9Ms_Ysz8FmuEpho",
  authDomain: "textchatt.firebaseapp.com",
  projectId: "textchatt",
  storageBucket: "textchatt.appspot.com",
  messagingSenderId: "939002202701",
  appId: "1:939002202701:web:c67e146655f8bbf8222a04",
  measurementId: "G-THYM109LHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, app};