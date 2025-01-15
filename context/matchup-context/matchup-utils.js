import { isEven } from '@/utils/utils';

function addWinnerToMatchups({ player, matchups, matchupId, winner }) {
  const round = parseFloat(matchupId.split('_M')[0].replace('R', ''));
  const position = parseFloat(matchupId.split('_M')[1]);
  // Determining the next round number
  const nextRound = round + 1;
  // Determining the next matchup number. If a position is even, dividing it by 2 gives you the next matchup number. If it is odd, first add 1, then divide it by 2.
  const nextMatchup = isEven(position) ? position / 2 : (position + 1) / 2;
  // Create the matchupId for this players next round.
  const nextMatchupId = `R${nextRound}_M${nextMatchup}`;
  // If a matchup position is an odd number, they will be the top position in the next matchup. If it is even, they will be the bottom position in the next matchup
  const isPositionEven = isEven(position);
  const updatedMatchups = matchups.map(matchup => {
    // Add the player to their next matchup bracket
    if (matchup.matchupId === nextMatchupId) {
      if (isPositionEven) {
        matchup.team2 = player;
        matchup.actualWinner = {
          ...matchup?.actualWinner,
          team2: winner,
        };
      } else {
        matchup.team1 = player;
        matchup.actualWinner = {
          ...matchup?.actualWinner,
          team1: winner,
        };
      }
    }
    // Set the winner for the current matchup
    if (matchup.matchupId === matchupId) {
      matchup.winner = player;
    }
    return matchup;
  });
  return updatedMatchups;
}

export const addUpdatedBracketSelectionsToMatchups = (
  updatedBracketSelections = [],
  contests = [],
  snowboarders
) => {
  const contestsCopy = Array.from(contests);

  // Loop through the updated bracket selections for each contest, and add the winner to the matchups
  for (let i = 0; i < contestsCopy.length; i++) {
    const contest = contests[i];
    const bracketSelectionsInCurrentRound = updatedBracketSelections[i];
    // If the contest is trivia (dark horse), we add selected winner to data
    // The matchup id is the question, it's a little confusing but that is how it is for now
    if (contest.questions) {
      // Loop through each question and add the selected winner to the question
      const updatedQuestions = contest.questions.map(questionData => {
        const question = questionData.question;
        const selectedWinner = bracketSelectionsInCurrentRound
          ? bracketSelectionsInCurrentRound[question]
          : '';

        if (selectedWinner) {
          questionData.selectedWinner = selectedWinner;
        }
        return questionData;
      });
      contest.questions = updatedQuestions;
      continue;
    }
    // If the contest is not trivia, it is a bracket challenge
    if (contest.matchups) {
      // Loop through each matchup and add the winners to the matchups
      for (let { matchupId, actualWinner } of contest.matchups) {
        if (!matchupId) continue;
        const selectedWinner = bracketSelectionsInCurrentRound
          ? bracketSelectionsInCurrentRound[matchupId]
          : '';

        const updatedMatchups = addWinnerToMatchups({
          player: snowboarders[selectedWinner],
          matchups: contest.matchups,
          matchupId,
          winner: actualWinner,
        });
        contest.matchups = updatedMatchups;
      }
    }
  }
  return contestsCopy;
};

// Creates placeholders for future rounds of the bracket that do not come from the data
export function createPlaceholdersForFutureRounds(allMatchups = []) {
  if (!allMatchups?.length) return [];
  const firstRoundMatchups = allMatchups.filter(({ matchupId }) => {
    if (matchupId?.includes('R1')) return true;
    return false;
  });

  const totalRounds = Math.ceil(Math.log2(firstRoundMatchups.length)) + 1;

  const matchupsAsMap = allMatchups.reduce((acc, curr) => {
    acc[curr.matchupId] = curr;
    return acc;
  }, {});

  const matchups = [...allMatchups];

  // First, we loop through each round in the contest
  for (let currentRound = 1; currentRound <= totalRounds; currentRound++) {
    // Since it is  possible that only some of the matchups come from the data, we have to determine how many there should be in total
    // For example, if only the first round matchups have been announced, we need to figure out how many matchups there will be in the second and possible future rounds
    const numberOfMatchupsInRound =
      firstRoundMatchups.length / Math.pow(2, currentRound - 1);

    // Second, we loop through all the matchups
    for (let i = 1; i <= numberOfMatchupsInRound; i++) {
      const matchupId = `R${currentRound}_M${i}`;
      // If the matchup does not exist in the matchups array, we add a placeholder so that it shows up in the bracket
      if (!matchupsAsMap[matchupId]) {
        matchups.push({
          matchupId: `R${currentRound}_M${i}`,
          position: i,
          round: currentRound,
          team1: {}, // Placeholder for team 1
          team2: {}, // Placeholder for team 2
        });
      }
    }
  }

  return matchups;
}

export function mapMatchupsAndSnowboardersToContestData(
  contests,
  snowboarders,
  matchups
) {
  if (!snowboarders || !matchups || !contests) return;
  const snowboardersAsMap = Object.values(snowboarders).reduce(
    (acc, snowboarder) => {
      acc[snowboarder.id] = snowboarder;
      return acc;
    },
    {}
  );

  const mapMatchupIdToMatchup = matchups.reduce((acc, matchup) => {
    acc[matchup.id] = matchup;
    return acc;
  }, {});

  const contestsWithMatchups = contests.map(contest => {
    const matchups = contest.matchups || [];
    if (!matchups.length) return contest;
    const matchupsData = matchups.map(matchup => {
      const updatedMatchup = mapMatchupIdToMatchup[matchup.id];
      if (!updatedMatchup) return matchup;

      const team1 = snowboardersAsMap[updatedMatchup.team1];
      const team2 = snowboardersAsMap[updatedMatchup.team2];
      const actualWinner = updatedMatchup.actualWinner
        ? snowboardersAsMap[updatedMatchup.actualWinner]
        : '';
      return {
        ...updatedMatchup,
        team1,
        team2,
        actualWinner,
      };
    });

    return {
      ...contest,
      matchups: matchupsData,
    };
  });

  return contestsWithMatchups;
}
