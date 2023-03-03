import { createContext, useContext } from 'react';
import { useAuthorization, useUserTeamData } from 'hooks';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const { userAuthData } = useAuthorization();
  const {
    userTeamData,
    isLoading: isUserTeamDataLoading,
    setUserTeamData,
  } = useUserTeamData({
    userAuthData,
  });

  const value = {
    authData: userAuthData,
    userTeamData,
    isUserTeamDataLoading,
    setUserTeamData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
