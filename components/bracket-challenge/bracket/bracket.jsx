import Player from 'components/bracket-challenge/player/player';
import styles from './bracket.module.scss';
import clsx from 'clsx';

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

export default function Bracket({
  snowboarders = [],
  round,
  matchupId,
  winner,
  correctWinner,
  bracketClassNames = '',
  isChampion = false,
}) {
  const height = getPlayerRowHeight(round);
  return (
    <div
      className={clsx(styles.bracket, bracketClassNames)}
      style={{
        height: `${height}px`,
      }}
    >
      {snowboarders.slice().map((snowboarder, index) => {
        return (
          <Player
            key={`matchup-${matchupId}-${index}`}
            {...snowboarder}
            round={round}
            matchupId={matchupId}
            selectedWinner={winner}
            correctWinner={correctWinner}
            isChampion={isChampion}
          />
        );
      })}
    </div>
  );
}
