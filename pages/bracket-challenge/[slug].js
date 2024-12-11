import BracketChallengeContainer from '@/components/bracket-challenge/bracket-challenge-container';
import Meta from '@/components/shared/Head/Head';
import { UserProvider } from '@/context/user-context/user-context';
import { MatchupDataProvider } from '@/context/matchup-context/matchup-context';
import {
  populateContestsWithSelectedWinnersAndMatchups,
  getSports,
  getContestsBySport,
  getSnowboardersBySport,
} from '@/lib/airtable';
import { createPlaceholdersForFutureRounds } from '@/context/matchup-context/matchup-utils';
import useRouteOnAuth from '@/components/LoginPage/useRouteOnAuth';

export default function BracketChallengePage({ contests = [], snowboarders }) {
  return;
  // useRouteOnAuth();
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
  const sport = context.params.slug;

  const contests = await getContestsBySport({ sport });
  if (!contests?.length)
    return {
      props: {},
    };

  const { snowboarders } = await getSnowboardersBySport({ sport });

  const contestsWithSelectedWinnersAndMatchups =
    await populateContestsWithSelectedWinnersAndMatchups(
      contests,
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

  const sortedContests = contestsWithAllMatchups.sort((a, b) => {
    if (a.order < b.order) return -1;
    return 1;
  });
  return {
    props: {
      contests: sortedContests,
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
