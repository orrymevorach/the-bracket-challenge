import BracketChallengeContainer from '@/components/bracket-challenge/bracket-challenge-container';
import Meta from '@/components/shared/Head/Head';
import { UserProvider } from '@/context/user-context/user-context';
import { MatchupDataProvider } from '@/context/matchup-context/matchup-context';
import {
  getContestsWithMatchupsData,
  getSnowboarders,
  getSports,
} from '@/lib/airtable';
import { createPlaceholdersForFutureRounds } from '@/context/matchup-context/matchup-utils';

export default function BracketChallengePage({
  contests = [],
  snowboarders = {},
}) {
  return (
    <>
      <Meta title="Bracket Challenge" />
      <UserProvider>
        <MatchupDataProvider contests={contests} snowboarders={snowboarders}>
          <BracketChallengeContainer />
        </MatchupDataProvider>
      </UserProvider>
    </>
  );
}

export async function getStaticProps(context) {
  const contests = await getContestsWithMatchupsData();
  if (!contests?.length)
    return {
      props: {},
    };
  const contestsInCurrentSport = contests.filter(contest => {
    if (!contest.sport) return false;
    return contest.sport[0].toLowerCase() === context.params.slug;
  });
  const contestsWithAllMatchups = contestsInCurrentSport.map(contest => {
    const matchups = contest.matchups;
    const matchupsWithExistingDataAndPlaceholdersForFutureRounds =
      createPlaceholdersForFutureRounds(matchups);
    return {
      ...contest,
      matchups: matchupsWithExistingDataAndPlaceholdersForFutureRounds,
    };
  });

  const { snowboarders } = await getSnowboarders();
  const snowboardersAsMap = snowboarders.reduce((acc, snowboarder) => {
    acc[snowboarder.name] = snowboarder;
    return acc;
  }, {});

  return {
    props: {
      contests: contestsWithAllMatchups,
      snowboarders: snowboardersAsMap,
    },
  };
}

export async function getStaticPaths() {
  const sports = await getSports();

  return {
    paths: sports.map(
      sport => `/bracket-challenge/${sport.name.toLowerCase()}`
    ),
    fallback: true,
  };
}
