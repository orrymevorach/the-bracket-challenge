import { WinnersProvider } from '@/context/winners-context/winners-context';
import League from '@/components/league/league';
import { LeagueConfigProvider } from '@/context/league-config-context/league-config-context';
import { ROUTES } from '@/utils/constants';
import { getPageLoadData } from '@/lib/contentful';
import { getAllLeagues } from '@/lib/airtable';
import Meta from '@/components/shared/head/head';
import { UserProvider } from '@/context/user-context/user-context';

export default function LeaguePage({ user }) {
  return (
    <>
      <Meta title="League" />
      <UserProvider user={user}>
        <WinnersProvider>
          <LeagueConfigProvider>
            <League />
          </LeagueConfigProvider>
        </WinnersProvider>
      </UserProvider>
    </>
  );
}

export async function getServerSideProps(context) {
  const { user } = await getPageLoadData(context);
  console.log('user', user);
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // const uid = user.uID;
  // const leagueData = await getUserLeaguesWithBrackets({ uid });

  return {
    props: {
      user,
    },
  };
}
