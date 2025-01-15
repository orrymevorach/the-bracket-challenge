import BracketChallengeContainer from '@/components/bracket-challenge/bracket-challenge-container';
import Meta from '@/components/shared/Head/Head';
import { UserProvider } from '@/context/user-context/user-context';
import { MatchupDataProvider } from '@/context/matchup-context/matchup-context';
import {
  populateContestsWithSelectedWinnersAndMatchups,
  getSports,
  getContestsBySport,
  getSnowboardersBySport,
  getQuestions,
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
  try {
    const sport = context.params.slug;

    // Fetch contests and handle missing data early
    const contests = await getContestsBySport({ sport });
    if (!contests?.length) return { props: {} };

    // Fetch snowboarders and handle missing data early
    const { snowboarders } = await getSnowboardersBySport({ sport });
    if (!snowboarders?.length) return { props: {} };

    // Populate contests with selected winners and matchups
    const contestsWithSelectedWinnersAndMatchups =
      await populateContestsWithSelectedWinnersAndMatchups(
        contests,
        snowboarders
      );

    // Handle contests with matchups, creating placeholders for future rounds
    const contestsWithAllMatchups = contestsWithSelectedWinnersAndMatchups.map(
      contest => {
        const matchups = contest.matchups || []; // Default to empty array if matchups is undefined
        if (!matchups.length) return contest;
        const matchupsWithExistingDataAndPlaceholdersForFutureRounds =
          createPlaceholdersForFutureRounds(matchups);
        return {
          ...contest,
          matchups: matchupsWithExistingDataAndPlaceholdersForFutureRounds,
        };
      }
    );

    // Fetch trivia data for contests with questions
    const contestsWithAllMatchupsAndTriviaData = await Promise.all(
      contestsWithAllMatchups.map(async contest => {
        const questions = contest.questions;
        if (!questions) return contest;
        const questionsData = await getQuestions({
          recIds: questions,
          snowboarders,
        });
        return { ...contest, questions: questionsData };
      })
    );

    // Create a map of snowboarders by name
    const snowboardersAsMap = snowboarders.reduce((acc, snowboarder) => {
      acc[snowboarder.name] = snowboarder;
      return acc;
    }, {});

    // Sort contests by order
    const sortedContests = contestsWithAllMatchupsAndTriviaData.sort((a, b) => {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0; // Handles case where a.order === b.order
    });

    // Return the props for the page
    return {
      props: {
        contests: sortedContests,
        snowboarders: snowboardersAsMap,
      },
    };
  } catch (error) {
    // Log and handle errors gracefully
    console.error('Error in getStaticProps:', error);
    return { props: {} }; // Optionally, return an error page or empty data
  }
}

export async function getStaticPaths() {
  const sports = await getSports();
  const filteredSports = sports.filter(sport => {
    if (!sport?.contests?.length) return false;
    if (sport.status !== 'Open') return false;
    return true;
  });

  return {
    paths: filteredSports.map(
      sport => `/bracket-challenge/${sport.name.toLowerCase()}`
    ),
    fallback: true,
  };
}
