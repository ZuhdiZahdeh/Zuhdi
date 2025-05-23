// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDPl_dVt3W6sJz_hLy9Z2Izb8ODKKnPaB4",
    authDomain: "students-platform-1d465.firebaseapp.com",
    projectId: "students-platform-1d465",
    storageBucket: "students-platform-1d465.firebasestorage.app",
    messagingSenderId: "652495188649",
    appId: "1:652495188649:web:2a3f0bfe40234b3ec1afb8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
