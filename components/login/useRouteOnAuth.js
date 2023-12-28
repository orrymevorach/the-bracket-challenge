import { useUser } from '@/context/user-context/user-context';;
import { ROUTES } from '@/utils/constants';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useRouteOnAuth() {
  const { authData } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (authData) {
      const authCookie = Cookies.get(COOKIES.UID);
      if (authCookie) {
        router.push({
          pathname: ROUTES.DASHBOARD,
        });
      }
    }
  }, [authData, router]);
}
