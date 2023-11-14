import Player from 'components/bracket-challenge/player/player';
import styles from './bracket.module.scss';
import clsx from 'clsx';

export default function Bracket({
  snowboarders = [],
  round,
  matchupId,
  winner,
  correctWinner,
  bracketClassNames = '',
  isChampion = false,
}) {
  return (
    <div className={clsx(styles.bracket, bracketClassNames)}>
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
