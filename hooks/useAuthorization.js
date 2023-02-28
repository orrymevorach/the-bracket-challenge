import { useEffect, useState } from 'react';
import { auth } from 'firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const useAuthorization = () => {
  const [userAuthData, setUserAuthData] = useState(null);
  useEffect(() => {
    const handleLoginOnPageLoad = onAuthStateChanged(
      auth,
      async firebaseUser => {
        if (firebaseUser) {
          setUserAuthData({
            name: firebaseUser.displayName,
            uid: firebaseUser.uid,
          });
        }
      }
    );

    return () => handleLoginOnPageLoad();
  }, []);
  return { userAuthData };
};

export default useAuthorization;
