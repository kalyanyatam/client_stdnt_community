// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzOs9jeHxQtk4rWsj6sOez7-X-wHoru2o",
  authDomain: "my-project-43d24.firebaseapp.com",
  projectId: "my-project-43d24",
  storageBucket: "my-project-43d24.firebasestorage.app",
  messagingSenderId: "1071534753206",
  appId: "1:1071534753206:web:26810e151a12e0851fed17",
  measurementId: "G-FZMP3H18N8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };