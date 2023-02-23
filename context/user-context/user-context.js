import { createContext, useContext, useState, useEffect } from 'react';
import { getUserTeam } from 'airtable-utils';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userTeamData, setUserTeamData] = useState({
    userTeam: null,
    isLoading: true,
  });
  useEffect(() => {
    if (!userTeamData.userTeamData) {
      getUserTeam({ name: 'Orry' }).then(response => {
        setUserTeamData(response);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={userTeamData}>{children}</UserContext.Provider>
  );
};
