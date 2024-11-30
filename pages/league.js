import League from '@/components/league/league';
import Meta from '@/components/shared/Head/Head';
import { UserProvider } from '@/context/user-context/user-context';
import { getLeague, getPageLoadData } from '@/lib/airtable';
import { getRecords } from '@/lib/airtable-utils';
import run from '@/scripts/index';

export default function LeaguePage({ user, league, contests }) {
  return (
    <>
      <Meta title="League" />
      <UserProvider user={user}>
        <League league={league} contests={contests} />
      </UserProvider>
    </>
  );
}

export async function getServerSideProps(context) {
  const { user } = await getPageLoadData(context);
  const leagueId = context.query.leagueId;

  if (!leagueId) {
    return {
      props: {
        user,
      },
    };
  }

  const { records: contests } = await getRecords({ tableId: 'Contests' });

  const league = await getLeague({ id: leagueId });
  const json = JSON.parse(league.json);
  const data = await run();
  json[0].selections = data;

  return {
    props: {
      user,
      league: {
        ...league,
        json,
      },
      contests,
    },
  };
}
