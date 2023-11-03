import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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
        error,
      };
    });
};

export const createFirebaseUser = ({ email, password }) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(response => response)
    .catch(error => {
      return {
        error,
      };
    });
};

export const errors = {
  'auth/invalid-email': {
    type: 'email',
    message:
      'We do not have a record of this email. Please create an account, or sign in with Google.',
  },
  'auth/user-not-found': {
    type: 'email',
    message:
      'We do not have a record of this email. Please create an account, or sign in with Google.',
  },
  'auth/email-already-in-use': {
    type: 'email',
    message:
      'This email is already in use. Please log in using your existing email and password.',
  },
  'auth/missing-password': {
    type: 'password',
    message: 'Please enter your password',
  },
  'auth/weak-password': {
    type: 'password',
    message:
      'Password should be at least 6 characters. Please enter a stronger password.',
  },
  'auth/operation-not-allowed': {
    type: 'password',
    message:
      'This password does not match the one we have on file for this email. Please double check your spelling, or contact your space admin',
  },
  'auth/wrong-password': {
    type: 'password',
    message:
      'This password does not match the one we have on file for this email. Please try again.',
  },
  GENERIC: {
    type: 'email',
    message:
      "We're sorry, an unknown error has occured. Please contact your space admin",
  },
};
