import Login from 'components/login';
import { useUser } from 'context/user-context/user-context';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ROUTES } from 'utils/constants';

export default function Home() {
  const { authData } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (authData) {
      Cookies.set('uid', authData.uid);
      router.push({
        pathname: ROUTES.DASHBOARD,
      });
    }
  }, [authData, router]);
  return <Login />;
}
