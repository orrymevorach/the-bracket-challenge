import Player from 'components/player';
import styles from './bracket.module.scss';

export const getPlayerRowHeight = round => {
  let start = 1;
  if (round === 5) {
    // last round should be same height as final round
    round = round - 1;
  }
  for (let index = 0; index < round; index++) {
    start = start * 2;
  }
  return start * 50;
};

export default function Bracket({ snowboarders = [], round, matchupId }) {
  return (
    <div className={styles.bracket}>
      <div>
        {snowboarders.slice().map((snowboarder, index) => {
          const { name, id } = snowboarder;
          return (
            <Player
              key={`matchup-${matchupId}-${index}`}
              name={name}
              id={id}
              round={round}
              matchupId={matchupId}
            />
          );
        })}
      </div>
    </div>
  );
}
