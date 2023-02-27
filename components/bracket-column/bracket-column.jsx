import Bracket from 'components/bracket';
import Loader from 'components/loader';
import styles from './bracket-column.module.scss';

// const sortRoundOne = (a, b) => {
//   const aMatchupNumber = a.matchupId.split('R1_')[1];
//   const bMatchupNumber = b.matchupId.split('R1_')[1];
//   if (aMatchupNumber > bMatchupNumber) return 1;
//   return -1;
// };

// const mapRoundToSortFunction = {
//   1: sortRoundOne,
// };

const mapRoundNumberToRoundName = {
  1: 'Round One',
  2: 'Quarter Final',
  3: 'Semi Final',
  4: 'Finals',
  5: 'Winner',
};

export default function BracketColumn({ matchups, round, isLoading }) {
  if (isLoading) return <Loader />;
  const roundName = mapRoundNumberToRoundName[round];
  // const sortFunction = mapRoundToSortFunction[round];
  return (
    <div className={styles.bracketColumn}>
      <h3 className={styles.roundName}>{roundName}</h3>
      {matchups
        .slice()
        // .sort(sortFunction)
        .map(({ matchupId, snowboarders }) => {
          return (
            <Bracket
              key={matchupId}
              snowboarders={snowboarders}
              round={round}
              matchupId={matchupId}
            />
          );
        })}
    </div>
  );
}
