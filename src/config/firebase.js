// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcqfikBgboZ_LKG6XNb5CAG0YnQmgICLw",
    authDomain: "vv-caring-center.firebaseapp.com",
    projectId: "vv-caring-center",
    storageBucket: "vv-caring-center.appspot.com",
    messagingSenderId: "392928562223",
    appId: "1:392928562223:web:54ffb85e23712a83654ada",
    measurementId: "G-MMKRG8EGZE"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);