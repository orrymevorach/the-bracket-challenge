import styles from './player.module.scss';
import { getPlayerRowHeight } from 'components/bracket/bracket';
import { useMatchups } from 'context/matchup-context/matchup-context';

export default function Player(player) {
  const { name, round } = player;
  const height = getPlayerRowHeight(round);
  const { setWinner, setRoundOneWinner } = useMatchups();

  const handleClick = round === 1 ? setRoundOneWinner : setWinner;
  return (
    <div
      className={styles.playerContainer}
      style={{
        height: `${height}px`,
      }}
    >
      <p>{name}</p>
      {name && (
        <button
          onClick={() => handleClick(player)}
          className={styles.selectButton}
        >
          Select
        </button>
      )}
    </div>
  );
}
