import Player from 'components/bracket-challenge/player/player';
import styles from './bracket.module.scss';
import clsx from 'clsx';

export default function Bracket({
  matchupId,
  bracketClassNames = '',
  team1,
  team2,
}) {
  const snowboarders = [team1, team2];
  return (
    <div className={clsx(styles.bracket, bracketClassNames)}>
      {snowboarders.map((snowboarder, index) => {
        return (
          <Player
            key={`matchup-${matchupId}-${index}`}
            {...snowboarder}
            matchupId={matchupId}
          />
        );
      })}
    </div>
  );
}
