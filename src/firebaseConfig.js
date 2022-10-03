import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBRhjhTEfe4lkvqBZt4EhxZ80a5a-e1ONw",
    authDomain: "food-delivery-app-c052e.firebaseapp.com",
    projectId: "food-delivery-app-c052e",
    storageBucket: "food-delivery-app-c052e.appspot.com",
    messagingSenderId: "342696282511",
    appId: "1:342696282511:web:a6963df767a246d0d963fa"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, storage }