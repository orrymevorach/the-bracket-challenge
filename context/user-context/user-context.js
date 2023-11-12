import { createContext, useContext, useEffect, useState } from 'react';
import useUserData from '@/context/user-context/useUser';

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
