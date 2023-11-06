import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoDicyD8lN8iPS_UUUHdWdwOz7tLc1YpA",
  authDomain: "practyai-b2521.firebaseapp.com",
  databaseURL:
    "https://practyai-b2521-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "practyai-b2521",
  storageBucket: "practyai-b2521.appspot.com",
  messagingSenderId: "553736750449",
  appId: "1:553736750449:web:c60c85327a60be152b62d0",
  measurementId: "G-Z1XPQEQC99",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getDatabase(app);

export { auth, db };
