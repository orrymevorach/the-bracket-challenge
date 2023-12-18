import ComingSoon from '@/components/coming-soon/coming-soon';
import Login from 'components/login/login';
import { useUser } from 'context/user-context/user-context';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { COOKIES, ROUTES } from 'utils/constants';

// export default function Home() {
//   const { authData } = useUser();
//   const router = useRouter();
//   useEffect(() => {
//     if (authData) {
//       const authCookie = Cookies.get(COOKIES.UID);
//       if (authCookie) {
//         router.push({
//           pathname: ROUTES.DASHBOARD,
//         });
//       }
//     }
//   }, [authData, router]);
//   return <Login />;
// }

export default function Home() {
  return (
    <ComingSoon />
  )
}