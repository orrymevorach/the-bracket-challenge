import { getSnowboarders } from '@/lib/airtable';
import { useEffect, useState } from 'react';

export default function useGetSnowboarders() {
  const [snowboarders, setSnowboarders] = useState([]);
  useEffect(() => {
    const getSnowboardersData = async () => {
      const data = await getSnowboarders();
      setSnowboarders(data.snowboarders);
    };
    getSnowboardersData();
  }, []);
  return snowboarders;
}
