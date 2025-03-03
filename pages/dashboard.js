import Meta from '@/components/shared/Head/Head';
import { UserProvider } from '@/context/user-context/user-context';
import { getSports } from '@/lib/airtable';
import DashboardPage from '@/components/DashboardPage/Dashboard';
import { getFeatureFlag } from '@/lib/contentful';
import { getLeague, getPageLoadData } from '@/lib/firebase';

export default function Dashboard({
  user,
  leagues,
  sports,
  enableDashboardFeatureFlag,
}) {
  return (
    <>
      <Meta title="Dashboard" />
      <UserProvider user={user}>
        <DashboardPage
          leagues={leagues}
          sports={sports}
          enableDashboardFeatureFlag={enableDashboardFeatureFlag}
        />
      </UserProvider>
    </>
  );
}

export async function getServerSideProps(context) {
  const { res } = context;
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  let enableDashboardFeatureFlag = false;
  let user = null;
  let sports = [];
  let leagues = [];

  try {
    enableDashboardFeatureFlag = await getFeatureFlag({
      name: 'ENABLE_DASHBOARD',
    });
    const pageLoadData = await getPageLoadData(context);
    user = pageLoadData.user;
    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    sports = await getSports();

    const leagueIds = user?.leagues || [];

    // Use this code AFTER duels airs. Show everyone the league ID, even if they are not in it
    const openLeagueId = 'recffMjjlVePQsbfb';
    const isInOpenLeague = leagueIds.includes(openLeagueId);
    if (!isInOpenLeague) {
      leagueIds.push(openLeagueId);
    }

    // Fetch league data
    if (leagueIds.length && enableDashboardFeatureFlag) {
      leagues = await Promise.all(
        leagueIds.map(async id => {
          const league = await getLeague({ id });
          return league;
        })
      );

      const mapSportToStatus = sports.reduce((acc, sport) => {
        acc[sport.name] = sport.status;
        return acc;
      }, {});

      leagues = leagues.filter(league => {
        if (!league) return false; // applies to leagues that have not been imgrated to firebase
        return league.sport && mapSportToStatus[league.sport] === 'Open';
      });
    }
  } catch (error) {
    console.error('Error during data fetching:', error);
  }

  return {
    props: {
      user: user || {},
      leagues,
      sports,
      enableDashboardFeatureFlag,
    },
  };
}
