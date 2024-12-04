import styles from './bracket-challenge.module.scss';
import { useMatchups } from 'context/matchup-context/matchup-context';
import BracketColumn from './bracket-column/bracket-column';
import { split } from '@/utils/utils';
import Player from './player/player';
import useWindowSize from '@/hooks/useWindowSize';

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

  const bracketConfig = {
    display: currentContest.display,
    numberOfColumns: currentContest.numberOfColumns,
    championRound: currentContest.championRound,
  };

  // Remove bracket columns (rounds) from rounds that do not require them
  const matchupsInRound = matchupsGroupedByRound.slice(
    0,
    bracketConfig.numberOfColumns
  );

  const winnersColumn =
    matchupsGroupedByRound[bracketConfig.championRound - 1]?.matchups;

  // If matchups are meant to be mirrored, split up the columns re-order them
  // On mobile do not split columns because it is too wide on the screen
  const reArrangedMatchups =
    bracketConfig.display === 'mirror' && !isMobile
      ? splitAndRearrangeColumns(matchupsInRound)
      : matchupsInRound;

  return (
    <>
      <div className={styles.bracketChallengeContainer}>
        <div className={styles.row}>
          {/* Loop through the array of rounds, and render a column of brackets for each matchup in the round */}
          {reArrangedMatchups.map(({ matchups }, index) => {
            return (
              <BracketColumn matchups={matchups} key={`matchup-${index}`} />
            );
          })}
          <div className={styles.winnersColumn}>
            {bracketConfig.display === 'mirror' ? (
              ''
            ) : bracketConfig.display === 'short' ? (
              winnersColumn.map(bracket => {
                const snowboarders = [bracket.team1, bracket.team2];
                const winners = bracket.actualWinner || {};
                return snowboarders.map((snowboarder, playerIndex) => {
                  const teamKey = playerIndex === 0 ? 'team1' : 'team2';
                  return (
                    <Player
                      key={`winners-column-${playerIndex}`}
                      winnerName={winners[teamKey]}
                      position={playerIndex + 1}
                      isChampion
                      matchupId={bracket.matchupId}
                      name={snowboarder}
                    />
                  );
                });
              })
            ) : (
              <Player
                name={winnersColumn[0].team1}
                winnerName={winnersColumn[0].actualWinner.team1}
                position={1}
                isChampion
                matchupId={winnersColumn[0].matchupId}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
