import Meta from '@/components/shared/head/head';
import { getPageLoadData } from '@/lib/contentful';
import Login from 'components/login/login';
import { useUser } from 'context/user-context/user-context';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { COOKIES, ROUTES } from 'utils/constants';

export default function LoginPage() {
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

  return (
    <>
      <Meta />
      <Login />
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: ROUTES.LOGIN,
  });

  return {
    props: {
      ...pageLoadData,
    },
  };
}
