import useAuthorization from 'hooks/useAuth';
import { createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const auth = useAuthorization();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
