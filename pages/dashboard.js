import Meta from '@/components/shared/head/head';
import { UserProvider } from '@/context/user-context/user-context';
import { getLeague } from '@/lib/airtable';
import DashboardPage from '@/components/DashboardPage/Dashboard';
import { getPageLoadData } from '@/lib/airtable';

export default function Dashboard({ leagues }) {
  return (
    <>
      <Meta title="Dashboard" />
      <UserProvider>
        {/* <WinnersProvider> */}
        {/* <UserLeagueProvider userLeagueData={userLeagueData}> */}
        <DashboardPage leagues={leagues} />
        {/* </UserLeagueProvider> */}
        {/* </WinnersProvider> */}
      </UserProvider>
    </>
  );
}

export async function getServerSideProps(context) {
  const { user } = await getPageLoadData(context);
  const leagueIds = user.leagues;
  if (!leagueIds) {
    return {
      props: {
        leagues: [],
      },
    };
  }
  const leagues = await Promise.all(
    leagueIds.map(async id => {
      const league = await getLeague({ id });
      const json = JSON.parse(league.json);

      return {
        ...league,
        json,
      };
    })
  );

  return {
    props: {
      leagues,
    },
  };
}
