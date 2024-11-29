import LeagueSettings from '@/components/league-settings/league-settings';
import Meta from '@/components/shared/Head/Head';
import { LeagueConfigProvider } from '@/context/league-config-context/league-config-context';
import { UserProvider } from '@/context/user-context/user-context';
import { getAllLeagues } from '@/lib/airtable';
import { getPageLoadData } from '@/lib/contentful';
import { ROUTES } from '@/utils/constants';

export default function LeaguePage() {
  return;
  return (
    <>
      <Meta title="League Settings" />
      <UserProvider>
        <LeagueConfigProvider>
          <LeagueSettings />
        </LeagueConfigProvider>
      </UserProvider>
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
  const pageLoadData = await getPageLoadData({
    url: ROUTES.LEAGUE_SETTINGS,
  });

  return {
    props: {
      ...pageLoadData,
    },
  };
}

export async function getStaticPaths() {
  // const leagues = await getAllLeagues();
  const leagues = [];

  return {
    paths: leagues.map(({ id }) => `/league-settings/${id}`),
    fallback: true,
  };
}
