import { getUser } from 'airtable-utils/member-utils';
import { useEffect, useState } from 'react';

export default function useUserTeamData({ userAuthData }) {
  const [userTeamData, setUserTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleSetUser = async () => {
      const { userTeamData } = await getUser({ uid: userAuthData.uid });

      if (userTeamData) {
        setUserTeamData(userTeamData);
        setIsLoading(false);
      } else {
        const newUserResponse = await createUser({ uid: userAuthData.uid });
        setUserTeamData(newUserResponse.userTeamData);
        setIsLoading(false);
      }
    };
    if (userAuthData) {
      handleSetUser();
    }
  }, [userAuthData]);
  return {
    userTeamData,
    isLoading,
  };
}
