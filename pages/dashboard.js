import Meta from '@/components/shared/Head/Head';
import { UserProvider } from '@/context/user-context/user-context';
import { getContests, getLeague, getSports } from '@/lib/airtable';
import DashboardPage from '@/components/DashboardPage/Dashboard';
import { getPageLoadData } from '@/lib/airtable';

export default function Dashboard({ user, leagues, sports }) {
  return (
    <>
      <Meta title="Dashboard" />
      <UserProvider user={user}>
        <DashboardPage leagues={leagues} sports={sports} />
      </UserProvider>
    </>
  );
}

export async function getServerSideProps(context) {
  const { user } = await getPageLoadData(context);
  const sports = await getSports();

  const leagueIds = user.leagues;
  if (!leagueIds) {
    return {
      props: {
        leagues: [],
        sports,
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
      user,
      leagues,
      sports,
    },
  };
}
