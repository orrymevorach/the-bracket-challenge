import Player from 'components/player';
import styles from './bracket.module.scss';

export const getPlayerRowHeight = round => {
  let start = 1;
  for (let index = 0; index < round; index++) {
    start = start * 2;
  }
  return start * 50;
};

export default function Bracket({ snowboarders = [], round, matchupId }) {
  return (
    <div className={styles.bracket} style={{}}>
      <div>
        {snowboarders.slice().map((snowboarder, index) => {
          const { name, id } = snowboarder;
          return (
            <Player
              key={name}
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
