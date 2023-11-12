import { getLeagueConfig } from '@/lib/airtable';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useGetLeagueConfig() {
  const [leagueConfig, setLeagueConfig] = useState('');
  const {
    query: { slug },
  } = useRouter();
  useEffect(() => {
    const getLeagueConfigData = async () => {
      const leagueConfig = await getLeagueConfig({ id: slug });
      setLeagueConfig(leagueConfig);
    };
    if (slug && !leagueConfig) {
      getLeagueConfigData();
    }
  }, [leagueConfig, slug]);
  return leagueConfig;
}
