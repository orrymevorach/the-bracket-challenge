import { useEffect, useState } from 'react';
import { auth } from 'firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const useAuthorization = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const handleLoginOnPageLoad = onAuthStateChanged(
      auth,
      async firebaseUser => {
        setUser({
          name: firebaseUser.displayName,
          uid: firebaseUser.uid,
        });
      }
    );

    return () => handleLoginOnPageLoad();
  }, []);
  return { user };
};

export default useAuthorization;
