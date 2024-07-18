import firebaseConfig from "./config/firebaseConfig";
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {getFirestore } from 'firebase/firestore'


//firebase app initialisation
const firebaseApp = initializeApp(firebaseConfig);

//authentication initialisation
const auth = getAuth(firebaseApp);

//database initialisation
const db = getFirestore(firebaseApp);

export {auth,db}