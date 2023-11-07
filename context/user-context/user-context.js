import { createContext, useContext, useEffect, useState } from 'react';
import useUserData from '@/hooks/useUser';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};
