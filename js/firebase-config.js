// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyCM8IflmHHgMaFseEoPPsECsLxsSAjj1Vw",
    authDomain: "curtainweb.firebaseapp.com",
    projectId: "curtainweb",
    storageBucket: "curtainweb.firebasestorage.app",
    messagingSenderId: "1004027071653",
    appId: "1:1004027071653:web:f29be419700c6302b6114c"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Firebase 서비스
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

