import { getUser } from '@/lib/airtable';
import { COOKIES, ROUTES } from '@/utils/constants';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useUser() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const uid = Cookies.get(COOKIES.UID);
    const handleSetUser = async () => {
      const user = await getUser({ uid });
      setUserData(user);
      setIsLoading(false);
    };
    if (uid) {
      handleSetUser();
    } else if (router.pathname !== '/') {
      router.push(`${ROUTES.HOME}?redirect=true`);
    } else {
      router.push(ROUTES.HOME);
    }
  }, []);
  return {
    ...userData,
    isLoading,
  };
}
