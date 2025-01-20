import { TABLES } from '@/utils/constants';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  orderBy,
  query,
  setDoc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';

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
export const db = getFirestore(app);

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

export const createFirebaseUser = ({
  email,
  password,
  firstName,
  lastName,
  username,
}) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async response => {
      const user = await createRecord({
        tableId: TABLES.MEMBERS,
        recordId: response.user.uid,
        newFields: {
          firstName,
          lastName,
          username,
          emailAddress: email,
          uid: response.user.uid,
          created: new Date().toISOString(),
        },
      });
      return user;
    })
    .catch(error => {
      return {
        error,
      };
    });
};

export const signOutOfFirebase = () => {
  return signOut(auth)
    .then(() => {})
    .catch(error => {
      return {
        error,
      };
    });
};

export const sendFirebasePasswordResetEmail = ({ email }) => {
  return sendPasswordResetEmail(auth, email)
    .then(() => {})
    .catch(error => {
      return {
        error,
      };
    });
};

export async function fetchSubcollection({
  collectionName,
  docName,
  subCollectionName,
}) {
  try {
    // Reference the parent document
    const theOpenDocRef = doc(db, collectionName, docName);

    // Reference the subcollection
    const bracketsCollectionRef = collection(theOpenDocRef, subCollectionName);

    const limitedQuery = query(
      bracketsCollectionRef,
      orderBy('rank', 'asc') // Replace "createdAt" with a field in your documents
      // limit(10)
    );

    // Fetch all documents in the subcollection
    const querySnapshot = await getDocs(limitedQuery);

    // Extract data from documents
    const brackets = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return brackets; // Return the fetched data
  } catch (error) {
    console.error('Error fetching subcollection:', error);
  }
}

export async function fetchBracketById({
  collectionName,
  docName,
  subCollectionName,
  bracketId, // ID of the bracket document
}) {
  try {
    // Reference the specific document in the subcollection
    const bracketDocRef = doc(
      db,
      collectionName,
      docName,
      subCollectionName,
      bracketId
    );

    // Fetch the document
    const docSnapshot = await getDoc(bracketDocRef);

    if (docSnapshot.exists()) {
      const bracket = { id: docSnapshot.id, ...docSnapshot.data() };
      return bracket; // Return the bracket data
    } else {
      console.log('No such document found!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching bracket by ID:', error);
  }
}

export const getUser = async ({ uid }) => {
  if (uid) {
    const memberRef = doc(db, 'members', uid);
    const memberSnap = await getDoc(memberRef);

    if (memberSnap.exists()) {
      return memberSnap.data();
    } else {
      console.log('No member data found!');
    }
  } else {
    console.log('User is not logged in.');
  }
};

export const getRecord = async ({ tableId, recordId }) => {
  if (tableId && recordId) {
    const recordRef = doc(db, tableId, recordId);
    const snap = await getDoc(recordRef);

    if (snap.exists()) {
      return snap.data();
    } else {
      console.log('No member data found!');
    }
  } else {
    console.log('User is not logged in.');
  }
};

export async function updateRecord({ tableId, recordId, newFields }) {
  try {
    const docRef = doc(db, tableId, recordId);
    await updateDoc(docRef, newFields);
    console.log(`Document with ID '${recordId}' updated successfully!`);
  } catch (error) {
    console.error('Error updating document:', error.message);
    throw error;
  }
}

export async function createRecord({ tableId, newFields, recordId = null }) {
  try {
    let docRef;
    let id;

    if (recordId) {
      // Use a specific document ID
      const docReference = doc(collection(db, tableId), recordId);
      await setDoc(docReference, newFields);
      await updateDoc(doc(db, tableId, recordId), { id: recordId });
      id = recordId;
    } else {
      // Use an auto-generated document ID
      docRef = await addDoc(collection(db, tableId), newFields);
      id = docRef.id;
      await updateDoc(doc(db, tableId, id), { id });
    }
    return { id, ...newFields };
  } catch (error) {
    console.error('Error creating document:', error.message);
    throw error;
  }
}

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
  PASSWORDS_DO_NOT_MATCH: {
    type: 'password',
    message: 'The passwords you have entered do not match. Please try again.',
  },
};
