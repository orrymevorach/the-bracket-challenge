import Bracket from 'components/bracket-challenge/bracket';
import styles from './bracket-column.module.scss';

export default function BracketColumn({ matchups, round }) {
  return (
    <div className={styles.bracketColumn}>
      {matchups.slice().map(matchup => {
        return <Bracket key={matchup.matchupId} round={round} {...matchup} />;
      })}
    </div>
  );
}
