import { useEffect, useState } from 'react';
import { getUserLeagueData } from '@/lib/airtable';
import Cookies from 'js-cookie';
import { COOKIES } from '@/utils/constants';

export default function useGetUserLeagueData() {
  const [leagueData, setLeagueData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLeagueData = async () => {
      const uid = Cookies.get(COOKIES.UID);
      const leagueData = await getUserLeagueData({ uid });
      setLeagueData(leagueData);
      setIsLoading(false);
    };
    if (!leagueData) {
      getLeagueData();
    }
  }, [leagueData]);
  return {
    leagueData,
    isLoading,
  };
}
