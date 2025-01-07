import Meta from '@/components/shared/Head/Head';
import { getPageLoadData, joinLeague } from '@/lib/airtable';
import Login from '@/components/LoginPage/Login';
import { UserProvider } from 'context/user-context/user-context';

export default function LoginPage() {
  return (
    <>
      <Meta />
      <UserProvider>
        <Login />
      </UserProvider>
    </>
  );
}

export async function getServerSideProps(context) {
  const leagueId = context.query.leagueId;
  const { user } = await getPageLoadData(context);

  if (leagueId && user) {
    await joinLeague({ user, leagueId });
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  if (leagueId && !user) {
    return {
      props: {},
    };
  }

  if (user) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
