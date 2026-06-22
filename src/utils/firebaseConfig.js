import { initializeApp } from 'firebase/app'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB68Fc2bI9uhOYhnY4zAW3jtGkIGY08cjY",
  authDomain: "portal-22619.firebaseapp.com",
  projectId: "portal-22619",
  storageBucket: "portal-22619.firebasestorage.app",
  messagingSenderId: "935750060994",
  appId: "1:935750060994:web:de7891160cb434b8a0645b",
  measurementId: "G-SQPG0SLKZP"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    console.log('Multiple tabs open')
  } else if (err.code == 'unimplemented') {
    console.log('Browser does not support')
  }
})
