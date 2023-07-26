// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5ePRcSNvY4CO9E0suLjLkvn7OuKMnPS4",
  authDomain: "st-pro-f4da4.firebaseapp.com",
  projectId: "st-pro-f4da4",
  storageBucket: "st-pro-f4da4.appspot.com",
  messagingSenderId: "72064830446",
  appId: "1:72064830446:web:c58dcb7346b84842b6dcff",
  measurementId: "G-ED54PQNVF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export default storage;