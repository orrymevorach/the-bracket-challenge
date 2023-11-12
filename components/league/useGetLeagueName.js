import { getLeagueName } from '@/lib/airtable';
import { useEffect, useState } from 'react';

export default function useGetLeagueName({ slug }) {
  const [leagueName, setLeagueName] = useState('');
  useEffect(() => {
    const getLeagueNameData = async () => {
      const leagueName = await getLeagueName({ id: slug });
      setLeagueName(leagueName);
    };
    if (slug && !leagueName) {
      getLeagueNameData();
    }
  }, [leagueName, slug]);
  return leagueName;
}
