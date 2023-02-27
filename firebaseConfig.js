import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAaYvW82yqVsvZf75QCtqQuZpSuXv3PvOc',
  authDomain: 'natural-selection-35f10.firebaseapp.com',
  projectId: 'natural-selection-35f10',
  storageBucket: 'natural-selection-35f10.appspot.com',
  messagingSenderId: '303567958407',
  appId: '1:303567958407:web:b25b6b3e1efdbbfbd76322',
};

export const app = initializeApp(firebaseConfig);
export const initFirebaseAuth = () => app;
export const auth = getAuth(app);
