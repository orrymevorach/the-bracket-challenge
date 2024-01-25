import Bracket from 'components/bracket-challenge/bracket/bracket';
import styles from './bracket-column.module.scss';

export default function BracketColumn({
  matchups,
  bracketClassNames = '',
  isChampion = false,
  currentRound,
}) {
  return (
    <div className={styles.bracketColumn}>
      {matchups
        .slice()
        .sort((a, b) => {
          const aPosition = a.position;
          const bPosition = b.position;
          if (aPosition > bPosition) return 1;
          return -1;
        })
        .map(matchup => {
          return (
            <Bracket
              key={matchup.matchupId}
              {...matchup}
              bracketClassNames={bracketClassNames}
              isChampion={isChampion}
              currentRound={currentRound}
            />
          );
        })}
    </div>
  );
}
