 <script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDPl_dVt3W6sJz_hLy9Z2Izb8ODKKnPaB4",
    authDomain: "students-platform-1d465.firebaseapp.com",
    projectId: "students-platform-1d465",
    storageBucket: "students-platform-1d465.firebasestorage.app",
    messagingSenderId: "652495188649",
    appId: "1:652495188649:web:2a3f0bfe40234b3ec1afb8",
    measurementId: "G-V4BN36PEZT"
};
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const db = getFirestore(app);  // أضف هذه السطر لتفعيل Firestore
</script>