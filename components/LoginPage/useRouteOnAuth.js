import { COOKIES, ROUTES } from '@/utils/constants';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useRouteOnAuth() {
  const router = useRouter();

  const authCookie = Cookies.get(COOKIES.UID);
  useEffect(() => {
    if (!authCookie) {
      router.push({
        pathname: ROUTES.LOGIN,
        query: { redirect: 'true' },
      });
    }
  }, [authCookie, router]);
}
