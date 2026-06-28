import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// Main Firebase Project (tbdsm-5acca)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Services
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

export default app

// Optional: Second Firebase Project for Chat (if using separate project)
let chatDb: any = null
let chatAuth: any = null

if (
  import.meta.env.VITE_FIREBASE_CHAT_API_KEY &&
  import.meta.env.VITE_FIREBASE_CHAT_PROJECT_ID
) {
  const chatFirebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_CHAT_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_CHAT_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_CHAT_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_CHAT_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_CHAT_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_CHAT_APP_ID,
  }

  const chatApp = initializeApp(chatFirebaseConfig, 'chat')
  chatDb = getFirestore(chatApp)
  chatAuth = getAuth(chatApp)
}

export { chatDb, chatAuth }
