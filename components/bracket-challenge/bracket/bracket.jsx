import Player from 'components/bracket-challenge/player/player';
import styles from './bracket.module.scss';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useMatchups } from '@/context/matchup-context/matchup-context';

export default function Bracket({
  matchupId,
  bracketClassNames = '',
  team1,
  team2,
  actualWinner,
  isChampion,
}) {
  const matchupRef = useRef(null);
  const { matchupRefs } = useMatchups();

  // Register the matchup ref so that we can scroll to it when the user makes a selection
  useEffect(() => {
    const registerMatchupRef = (matchupId, ref) => {
      matchupRefs.current[matchupId] = ref;
    };
    if (matchupId && matchupRef?.current) {
      registerMatchupRef(matchupId, matchupRef.current);
    }
  }, [matchupId, matchupRef]);

  // The first round matchups or the user selections in rounds past round 1
  const snowboarders = [team1, team2];
  // The actual winners from the contest
  const winners = [actualWinner?.team1, actualWinner?.team2];
  return (
    <div className={clsx(styles.bracket, bracketClassNames)} ref={matchupRef}>
      {snowboarders.map((snowboarder, index) => {
        return (
          <Player
            key={`matchup-${matchupId}-${index}`}
            matchupId={matchupId}
            winnerName={winners[index]?.name}
            position={index + 1}
            isChampion={isChampion}
            name={snowboarder?.name}
          />
        );
      })}
    </div>
  );
}
