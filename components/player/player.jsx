import { getPlayerRowHeight } from 'components/bracket/bracket';
import { useMatchups } from 'context/matchup-context/matchup-context';

export default function Player(player) {
  const { name, round } = player;
  const height = getPlayerRowHeight(round);
  const { setWinner } = useMatchups();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: `${height}px`,
      }}
    >
      <p style={{ width: '150px' }}>{name}</p>
      <button onClick={() => setWinner(player)} style={{ marginLeft: '15px' }}>
        Select
      </button>
    </div>
  );
}
