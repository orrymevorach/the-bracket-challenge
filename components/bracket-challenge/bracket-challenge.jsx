import styles from './bracket-challenge.module.scss';
import { useMatchups } from 'context/matchup-context/matchup-context';
import Loader from 'components/shared/loader/loader';
import BracketColumn from './bracket-column/bracket-column';
import { split } from '@/utils/utils';
import Player from './player/player';
import { useConfig } from '@/context/config-context/config-context';
import RiderImagesLayout from './rider-images-layout/rider-images-layout';

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

export default function BracketChallenge({ bracketConfig, currentRound }) {
  const { matchups } = useMatchups();

  const {
    config: { showMatchups },
  } = useConfig();

  const matchupsInCurrentRound = matchups[currentRound] || [];
  const matchupsGroupedByRound = groupMatchupsByRound(matchupsInCurrentRound);

  if (!showMatchups) return;
  if (!matchupsGroupedByRound.length || !matchupsInCurrentRound.length) {
    return <Loader isDotted />;
  }

  // Remove bracket columns (rounds) from rounds that do not require them
  const matchupsInRound = matchupsGroupedByRound.slice(
    0,
    bracketConfig.numberOfColumns
  );

  const winnersColumn =
    matchupsGroupedByRound[bracketConfig.championRound - 1]?.matchups;

  // If matchups are meant to be mirrored, split up the columns re-order them
  const reArrangedMatchups =
    bracketConfig.display === 'mirror'
      ? splitAndRearrangeColumns(matchupsInRound)
      : matchupsInRound;

  return (
    <RiderImagesLayout currentRound={currentRound}>
      <div className={styles.bracketChallengeContainer}>
        <div className={styles.row}>
          {/* Loop through the array of rounds, and render a column of brackets for each matchup in the round */}
          {reArrangedMatchups.map(({ matchups }, index) => {
            return (
              <BracketColumn
                matchups={matchups}
                key={`matchup-${index}`}
                currentRound={currentRound}
              />
            );
          })}
          <div className={styles.winnersColumn}>
            {winnersColumn.map(bracket => {
              const snowboarders = [bracket.team1, bracket.team2];
              const winners = bracket.actualWinner;
              if (!snowboarders || !winners) return;
              return snowboarders.map((snowboarder, playerIndex) => {
                const teamKey = playerIndex === 0 ? 'team1' : 'team2';
                // This is an ugly temporary fix for the extra players slot that shows up in duels men. It shows up becaused there are an odd number of matchups in round 1 (3).
                // if (
                //   currentRound === 'Duels' &&
                //   bracket.matchupId === 'R2_M2' &&
                //   teamKey === 'team2'
                // )
                //   return;
                return (
                  <Player
                    key={`winners-column-${playerIndex}`}
                    {...snowboarder}
                    winner={winners[teamKey]}
                    position={playerIndex + 1}
                    isChampion
                    matchupId={bracket.matchupId}
                  />
                );
              });
            })}
          </div>
        </div>
      </div>
    </RiderImagesLayout>
  );
}
