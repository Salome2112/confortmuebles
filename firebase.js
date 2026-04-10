import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "confortmuebles-5f964.firebaseapp.com",
  projectId: "confortmuebles-5f964",
  storageBucket: "confortmuebles-5f964.firebasestorage.app",
  messagingSenderId: "880968466284",
  appId: "1:880968466284:web:f9495087ba1aec4b82bd49"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };