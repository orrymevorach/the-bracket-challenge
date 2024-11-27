import { getUser } from '@/lib/airtable';
import { COOKIES, ROUTES } from '@/utils/constants';
import { isEmpty } from '@/utils/utils';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useUser({ user }) {
  const [userData, setUserData] = useState(user || {});
  const [isLoading, setIsLoading] = useState(user ? false : true);
  const router = useRouter();

  useEffect(() => {
    const hasUser = !isEmpty(userData);
    if (hasUser) return;

    const uid = Cookies.get(COOKIES.UID);
    const handleSetUser = async () => {
      const user = await getUser({ uid });
      setUserData(user);
      setIsLoading(false);
    };

    if (uid) {
      handleSetUser();
    }
    // else if (router.pathname !== '/' && router.pathname !== '/login') {
    //   router.push(`${ROUTES.HOME}?redirect=true`);
    // }
  }, []);
  return {
    ...userData,
    isLoading,
  };
}
