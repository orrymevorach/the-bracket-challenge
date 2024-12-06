import BracketChallengeContainer from '@/components/bracket-challenge/bracket-challenge-container';
import Meta from '@/components/shared/Head/Head';
import { UserProvider } from '@/context/user-context/user-context';
import { MatchupDataProvider } from '@/context/matchup-context/matchup-context';
import {
  getContests,
  getContestsWithMatchupsData,
  getSnowboarders,
  getSports,
} from '@/lib/airtable';
import { createPlaceholdersForFutureRounds } from '@/context/matchup-context/matchup-utils';
import { getRecordById } from '@/lib/airtable-utils';

export default function BracketChallengePage({
  contestsInCurrentSport,
  contestsWithMatchups,
  // contestsInCurrentSport,
  // contestsWithAllMatchups,
}) {
  console.log('contestsWithMatchups', contestsWithMatchups);
  console.log('contestsInCurrentSport', contestsInCurrentSport);

  // console.log('contests', contests);
  // console.log('contestsInCurrentSport', contestsInCurrentSport);
  // console.log('contestsWithAllMatchups', contestsWithAllMatchups);
  // console.log('snowboarders', snowboarders);
  return;
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

  const { snowboarders } = await getSnowboarders();
  const snowboardersMap = snowboarders.reduce((acc, snowboarder) => {
    acc[snowboarder.id] = snowboarder;
    return acc;
  }, {});

  const contestsInCurrentSport = contests.filter(contest => {
    if (!contest.sport) return false;
    return contest.sport[0].toLowerCase() === context.params.slug;
  });

  const contestsWithMatchups = await Promise.all(
    contestsInCurrentSport.map(async contest => {
      const matchups = contest.matchups || [];
      if (!matchups.length) return contest;
      const matchupsData = await Promise.all(
        matchups.map(async matchupId => {
          const { record: matchup } = await getRecordById({
            tableId: 'Matchups',
            recordId: matchupId,
            // endpoint: '/get-matchup',
          });
          const team1 = snowboardersMap[matchup.team1];
          const team2 = snowboardersMap[matchup.team2];
          const actualWinner = matchup.actualWinner
            ? snowboardersMap[matchup.actualWinner]
            : '';
          return {
            ...matchup,
            team1,
            team2,
            actualWinner,
          };
        })
      );
      return {
        ...contest,
        matchups: matchupsData,
      };
    })
  );

  return {
    props: {
      contestsInCurrentSport,
      contestsWithMatchups,
    },
  };
  const contestsWithAllMatchups = contestsInCurrentSport.map(contest => {
    const matchups = contest.matchups;
    if (!matchups?.length) return contest;
    const matchupsWithExistingDataAndPlaceholdersForFutureRounds =
      createPlaceholdersForFutureRounds(matchups);
    return {
      ...contest,
      matchups: matchupsWithExistingDataAndPlaceholdersForFutureRounds,
    };
  });

  const snowboardersAsMap = snowboarders.reduce((acc, snowboarder) => {
    acc[snowboarder.name] = snowboarder;
    return acc;
  }, {});

  return {
    props: {
      contests: contestsWithAllMatchups,
      snowboarders: snowboardersAsMap,
      contestsInCurrentSport,
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
