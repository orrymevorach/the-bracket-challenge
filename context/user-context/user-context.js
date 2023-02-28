import { createContext, useContext, useState, useEffect } from 'react';
import { useAuthorization } from 'hooks';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const { userAuthData } = useAuthorization();
  const [userAirtableRecordId, setUserAirtableRecordId] = useState('');
  const value = {
    authData: userAuthData,
    airtableRecordData: {
      userAirtableRecordId,
      setUserAirtableRecordId,
    },
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
