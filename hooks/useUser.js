import { getUser } from '@/lib/airtable';
import { useEffect, useState } from 'react';

export default function useUser({ uid }) {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleSetUser = async () => {
      const user = await getUser({ uid });
      setUserData(user);
      setIsLoading(false);
    };
    if (uid) {
      handleSetUser();
    }
  }, [uid]);
  return {
    ...userData,
    isLoading,
  };
}
