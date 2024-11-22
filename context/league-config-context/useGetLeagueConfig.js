import { getBracketName, getLeague } from '@/lib/airtable';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useGetLeagueConfig() {
  const [leagueConfig, setLeagueConfig] = useState('');
  const {
    query: { leagueId, bracketId },
  } = useRouter();
  useEffect(() => {
    const getLeagueConfigData = async () => {
      const leagueConfig = await getLeague({ id: leagueId });
      let bracketData = {};
      if (bracketId) {
        bracketData = await getBracketName({ id: bracketId });
      }
      setLeagueConfig({ ...leagueConfig, bracketData });
    };
    if (leagueId && !leagueConfig) {
      getLeagueConfigData();
    }
  }, [leagueConfig, leagueId, bracketId]);

  return leagueConfig;
}
