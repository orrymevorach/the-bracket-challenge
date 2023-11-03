import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { COOKIES } from '@/utils/constants';
import useUserData from '@/hooks/useUser';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [uid, setUid] = useState();
  useEffect(() => {
    if (!uid) {
      const uidCookie = Cookies.get(COOKIES.UID);
      setUid(uidCookie);
    }
  }, [uid]);
  const userData = useUserData({ uid });

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};
