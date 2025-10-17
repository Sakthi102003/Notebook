import { initializeApp } from 'firebase/app'
import { getDatabase, ref, runTransaction, onValue } from 'firebase/database'

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

// Reference to the visitor count in the database
const visitorCountRef = ref(database, 'visitorCount')

/**
 * Increment the visitor count
 * This uses a transaction to ensure the count is incremented atomically
 */
export const incrementVisitorCount = async (): Promise<number> => {
  try {
    const result = await runTransaction(visitorCountRef, (currentValue) => {
      return (currentValue || 0) + 1
    })
    return result.snapshot.val()
  } catch (error) {
    console.error('Error incrementing visitor count:', error)
    return 0
  }
}

/**
 * Get the current visitor count
 * Returns a promise that resolves with the current count
 */
export const getVisitorCount = (): Promise<number> => {
  return new Promise((resolve) => {
    onValue(visitorCountRef, (snapshot) => {
      resolve(snapshot.val() || 0)
    }, { onlyOnce: true })
  })
}

/**
 * Subscribe to visitor count changes
 * Returns an unsubscribe function
 */
export const subscribeToVisitorCount = (
  callback: (count: number) => void
): (() => void) => {
  return onValue(visitorCountRef, (snapshot) => {
    callback(snapshot.val() || 0)
  })
}
