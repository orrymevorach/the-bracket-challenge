import { getUser } from '@/lib/airtable';
import { COOKIES } from '@/utils/constants';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function useUser() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const uid = Cookies.get(COOKIES.UID);
    const handleSetUser = async () => {
      const user = await getUser({ uid });
      setUserData(user);
      setIsLoading(false);
    };
    if (uid) {
      handleSetUser();
    }
  }, []);
  return {
    ...userData,
    isLoading,
  };
}
