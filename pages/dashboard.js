import Meta from '@/components/shared/Head/Head';
import { UserProvider } from '@/context/user-context/user-context';
import { getLeague, getSports } from '@/lib/airtable';
import DashboardPage from '@/components/DashboardPage/Dashboard';
import { getPageLoadData } from '@/lib/airtable';
import { getFeatureFlag } from '@/lib/contentful';

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
    sports = await getSports();

    const leagueIds = user?.leagues || [];
    if (leagueIds.length && enableDashboardFeatureFlag) {
      leagues = await Promise.all(
        leagueIds.map(async id => {
          const league = await getLeague({ id });
          const json = league?.json ? JSON.parse(league.json) : [];
          return {
            ...league,
            json,
          };
        })
      );

      const mapSportToStatus = sports.reduce((acc, sport) => {
        acc[sport.name] = sport.status;
        return acc;
      }, {});

      leagues = leagues.filter(
        league => league.sport && mapSportToStatus[league.sport] === 'Open'
      );
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
