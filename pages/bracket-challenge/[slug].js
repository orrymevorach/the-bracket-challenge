import BracketChallengeContainer from '@/components/bracket-challenge/bracket-challenge-container';
import Meta from '@/components/shared/Head/Head';
import { UserProvider } from '@/context/user-context/user-context';
import { MatchupDataProvider } from '@/context/matchup-context/matchup-context';
import {
  getContests,
  populateContestsWithSelectedWinnersAndMatchups,
  getSnowboarders,
  getSports,
} from '@/lib/airtable';
import { createPlaceholdersForFutureRounds } from '@/context/matchup-context/matchup-utils';
import useRouteOnAuth from '@/components/LoginPage/useRouteOnAuth';

export default function BracketChallengePage({ contests = [], snowboarders }) {
  useRouteOnAuth();
  if (!contests.length) return null;

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
  const contests = await getContests();
  if (!contests?.length)
    return {
      props: {},
    };

  const sport = context.params.slug;
  const contestsInCurrentSport = contests.filter(contest => {
    if (!contest.sport) return false;
    return contest.sport[0].toLowerCase() === sport.toLowerCase();
  });
  const { snowboarders } = await getSnowboarders({ sport });

  const contestsWithSelectedWinnersAndMatchups =
    await populateContestsWithSelectedWinnersAndMatchups(
      contestsInCurrentSport,
      snowboarders
    );

  const contestsWithAllMatchups = contestsWithSelectedWinnersAndMatchups.map(
    contest => {
      const matchups = contest.matchups;
      if (!matchups?.length) return contest;
      const matchupsWithExistingDataAndPlaceholdersForFutureRounds =
        createPlaceholdersForFutureRounds(matchups);
      return {
        ...contest,
        matchups: matchupsWithExistingDataAndPlaceholdersForFutureRounds,
      };
    }
  );

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
