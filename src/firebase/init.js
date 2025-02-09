// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8UVeRljQnQL5ycY4_xY-Jv_uV7s6YH08",
  authDomain: "astraride-92189.firebaseapp.com",
  projectId: "astraride-92189",
  storageBucket: "astraride-92189.firebasestorage.app",
  messagingSenderId: "791644042844",
  appId: "1:791644042844:web:f7051e1d887ffce548d899",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//connecting firestore

const db = getFirestore(app);

export default { app, db };
