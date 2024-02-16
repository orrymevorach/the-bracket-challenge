import { getLeagueConfig } from '@/lib/airtable';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useGetLeagueConfig() {
  const [leagueConfig, setLeagueConfig] = useState('');
  const {
    query: { slug },
  } = useRouter();
  console.log('slug', slug);
  // useEffect(() => {
  // const getLeagueConfigData = async () => {
  // const leagueConfig = await getLeagueConfig({ id: slug });
  // console.log('leagueConfig', leagueConfig);
  // setLeagueConfig(leagueConfig);
  // };
  // if (slug && !leagueConfig) {
  //   getLeagueConfigData();
  // }
  // }, [leagueConfig, slug]);

  return leagueConfig;
}
