import Meta from '@/components/shared/Head/Head';
import { UserProvider } from '@/context/user-context/user-context';
import { getLeague } from '@/lib/airtable';
import DashboardPage from '@/components/DashboardPage/Dashboard';
import { getPageLoadData } from '@/lib/airtable';

export default function Dashboard({ user, leagues }) {
  return (
    <>
      <Meta title="Dashboard" />
      <UserProvider user={user}>
        <DashboardPage leagues={leagues} />
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
      user,
      leagues,
    },
  };
}
