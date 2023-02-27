import Player from 'components/player';
import styles from './bracket.module.scss';

export const getPlayerRowHeight = round => {
  let start = 1;
  if (round === 4) {
    // last round should be same height as final round
    round = round - 1;
  }
  if (round === 5) {
    // last round should be same height as final round
    round = round - 2;
  }
  for (let index = 0; index < round; index++) {
    start = start * 2;
  }
  return start * 70;
};

export default function Bracket({ snowboarders = [], round, matchupId }) {
  const height = getPlayerRowHeight(round);
  return (
    <div
      className={styles.bracket}
      style={{
        height: `${height}px`,
      }}
    >
      <div>
        {snowboarders.slice().map((snowboarder, index) => {
          return (
            <Player
              key={`matchup-${matchupId}-${index}`}
              {...snowboarder}
              round={round}
              matchupId={matchupId}
            />
          );
        })}
      </div>
    </div>
  );
}
