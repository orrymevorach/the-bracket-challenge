import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const initFirebaseAuth = () => app;
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const initGoogleAuthWithFirebase = () => {
  return signInWithPopup(auth, provider)
    .then(response => response)
    .catch(error => error);
};

export const signInWithFirebaseEmailAndPassword = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(response => response)
    .catch(error => {
      return {
        error: {
          code: error.code,
        },
      };
    });
};
