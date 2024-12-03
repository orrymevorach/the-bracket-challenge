import BracketChallengeContainer from '@/components/bracket-challenge/bracket-challenge-container';
import Meta from '@/components/shared/Head/Head';
import { UserProvider } from '@/context/user-context/user-context';
import { MatchupDataProvider } from '@/context/matchup-context/matchup-context';
import { getContestsWithMatchupsData, getSports } from '@/lib/airtable';

export default function BracketChallengePage({ contests }) {
  return (
    <>
      <Meta title="Bracket Challenge" />
      <UserProvider>
        <MatchupDataProvider contests={contests}>
          <BracketChallengeContainer />
        </MatchupDataProvider>
      </UserProvider>
    </>
  );
}

function generateBracket(firstRoundMatchups) {
  const totalRounds = Math.ceil(Math.log2(firstRoundMatchups.length));

  const bracket = [...firstRoundMatchups];

  for (let round = 1; round <= totalRounds + 1; round++) {
    const numberOfMatchupsInRound = Math.ceil(
      firstRoundMatchups.length / Math.pow(2, round - 1)
    );

    if (round !== 1) {
      for (let i = 1; i <= numberOfMatchupsInRound; i++) {
        bracket.push({
          matchupId: `R${round}_M${i}`,
          position: i,
          round: round,
          team1: {}, // Placeholder for team 1
          team2: {}, // Placeholder for team 2
        });
      }
    }
  }

  return bracket;
}
export async function getStaticProps(context) {
  const contestData = await getContestsWithMatchupsData();
  const filterBySport = contestData.filter(
    contest => contest.sport[0].toLowerCase() === context.params.slug
  );
  const sportsWithAllMatchus = filterBySport.map(sport => {
    const firstRoundMatchups = sport.matchups;
    const allMatchups = generateBracket(firstRoundMatchups);
    return {
      ...sport,
      matchups: allMatchups,
    };
  });

  return {
    props: {
      contests: sportsWithAllMatchus,
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
