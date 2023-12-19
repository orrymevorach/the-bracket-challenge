import LeagueSettings from '@/components/league-settings/league-settings';
import Meta from '@/components/shared/head/head';
import { LeagueConfigProvider } from '@/context/league-config-context/league-config-context';
import { getLeagueIds } from '@/lib/airtable';
import { getPageLoadData } from '@/lib/contentful';
import { ROUTES } from '@/utils/constants';

export default function LeaguePage() {
  return (
    <>
      <Meta />
      <LeagueConfigProvider>
        <LeagueSettings />
      </LeagueConfigProvider>
    </>
  );
}

export async function getStaticProps() {
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
  const leagues = await getLeagueIds();

  return {
    paths: leagues.map(({ id }) => `/league-settings/${id}`),
    fallback: true,
  };
}
