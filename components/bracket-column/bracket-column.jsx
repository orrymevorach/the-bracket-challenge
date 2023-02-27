import Bracket from 'components/bracket';
import Loader from 'components/loader';
import styles from './bracket-column.module.scss';

export default function BracketColumn({ matchups, round, isLoading }) {
  if (isLoading) return <Loader />;
  return (
    <div className={styles.bracketColumn}>
      {matchups.slice().map(({ matchupId, snowboarders }) => {
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
