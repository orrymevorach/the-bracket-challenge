import BracketSettings from '@/components/bracket-settings/bracket-settings';
import Meta from '@/components/shared/head/head';
import { LeagueConfigProvider } from '@/context/league-config-context/league-config-context';
import { UserProvider } from '@/context/user-context/user-context';
import { getAllBrackets } from '@/lib/airtable';
import { getPageLoadData } from '@/lib/contentful';
import { ROUTES } from '@/utils/constants';

export default function BracketSettingsPage() {
  return (
    <>
      <Meta />
      <UserProvider>
        <LeagueConfigProvider>
          <BracketSettings />
        </LeagueConfigProvider>
      </UserProvider>
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: ROUTES.BRACKET_SETTINGS,
  });

  return {
    props: {
      ...pageLoadData,
    },
  };
}

export async function getStaticPaths() {
  const brackets = await getAllBrackets();

  return {
    paths: brackets.map(({ id }) => `/bracket-settings/${id}`),
    fallback: true,
  };
}
