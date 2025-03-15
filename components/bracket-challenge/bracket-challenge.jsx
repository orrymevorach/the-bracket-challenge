// Display options:
// 1. regular - doesn't affect anything, more of a placeholder
// 2. short - used for shortened rounds where there is only one round per matchup
// 3. mirror - used when we want to split the brackets and mirror them on the screen

import styles from './bracket-challenge.module.scss';
import { useMatchups } from 'context/matchup-context/matchup-context';
import BracketColumn from './bracket-column/bracket-column';
import { split } from '@/utils/utils';
import Player from './player/player';
import useWindowSize from '@/hooks/useWindowSize';
import BracketArrowButtons from './BracketArrowButtons/BracketArrowButtons';

// Create an array of 4 objects, where each object contains a 'matchups' key, that has a list of all of the matchups in the array
const groupMatchupsByRound = matchups =>
  matchups.reduce((acc, curr) => {
    const round = curr.round;
    if (!acc[round - 1]) {
      acc[round - 1] = {};
      acc[round - 1].matchups = [];
    }
    acc[round - 1].matchups.push(curr);
    return acc;
  }, []);

const splitAndRearrangeColumns = matchups => {
  const newMatchups = [];
  for (let round of matchups) {
    // Sort matchups by position
    const sortByPosition = round.matchups.sort((a, b) => {
      if (a.position > b.position) {
        return 1;
      }
      return -1;
    });
    // divide matchups in two
    const [one, two] = split(sortByPosition);
    // Add each half to the new matchups array
    newMatchups.push({ matchups: one });
    newMatchups.push({ matchups: two });
  }
  // Manually re-arranging the order of the columns. This is too manual, couldn't figure out how to do this dynamically
  let reArrangedMatchups = [];
  if (newMatchups.length === 4) {
    reArrangedMatchups.push(newMatchups[0]);
    reArrangedMatchups.push(newMatchups[2]);
    reArrangedMatchups.push(newMatchups[3]);
    reArrangedMatchups.push(newMatchups[1]);
  }
  return reArrangedMatchups;
};

export default function BracketChallenge() {
  const { currentContest } = useMatchups();
  const { isMobile } = useWindowSize();

  const matchupsGroupedByRound = groupMatchupsByRound(currentContest.matchups);

  const display = currentContest.display;

  // If matchups are meant to be mirrored, split up the columns re-order them
  // On mobile do not split columns because it is too wide on the screen
  const reArrangedMatchups =
    display === 'mirror' && !isMobile
      ? splitAndRearrangeColumns(matchupsGroupedByRound)
      : matchupsGroupedByRound;

  // For regular bracket - the only scenario with a final player at the end (i.e. not a full bracket), add a column for the winners
  const winnersColumnMatchup =
    matchupsGroupedByRound[matchupsGroupedByRound.length - 1]?.matchups;
  const winnersColumnMatchupRound = parseFloat(
    winnersColumnMatchup[0]?.matchupId.split('_')[0].replace('R', '')
  );
  const winnersColumnMatchupId = `R${winnersColumnMatchupRound + 1}_M1`;

  return (
    <>
      <div className={styles.bracketChallengeContainer}>
        <BracketArrowButtons
          leftArrowClassNames={display === 'regular' && styles.leftArrow}
          rightArrowClassNames={display === 'regular' && styles.rightArrow}
        >
          <div className={styles.row}>
            {/* Loop through the array of rounds, and render a column of brackets for each matchup in the round */}
            {reArrangedMatchups.map(({ matchups }, index) => {
              return (
                <BracketColumn matchups={matchups} key={`matchup-${index}`} />
              );
            })}
            {display === 'regular' && (
              <div className={styles.winnersColumn}>
                <Player
                  name={winnersColumnMatchup[0].winner?.name}
                  winnerName={winnersColumnMatchup[0].actualWinner?.name}
                  position={1}
                  isChampion
                  matchupId={winnersColumnMatchupId}
                />
              </div>
            )}
          </div>
        </BracketArrowButtons>
      </div>
    </>
  );
}
