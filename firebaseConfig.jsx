import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCKZqzjipnjn7DlRYwXSCp_hUw0bagr6GU",
  authDomain: "community-market-ll.firebaseapp.com",
  projectId: "community-market-ll",
  storageBucket: "community-market-ll.appspot.com",
  messagingSenderId: "64460442437",
  appId: "1:64460442437:web:66c9553ab1357a0a5d4c2c",
  measurementId: "G-LLVDJVFWY1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);