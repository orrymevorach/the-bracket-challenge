import { isEven } from '@/utils/utils';
import styles from './player.module.scss';
import { useMatchups } from 'context/matchup-context/matchup-context';
import Image from 'next/image';
import clsx from 'clsx';
import { useConfig } from '@/context/config-context/config-context';

const mapCountryToFlagImg = {
  USA: '/flags/USA.svg',
  Canada: '/flags/canada.svg',
  Norway: '/flags/norway.svg',
  Finland: '/flags/finland.svg',
  ['New Zealand']: '/flags/new-zealand.svg',
  Austria: '/flags/austria.svg',
  France: '/flags/france.svg',
};

export default function Player(player) {
  const { name, country, matchupId, isChampion, winner, position } = player;
  const { setWinner, matchups } = useMatchups();

  const [firstName, lastName] = name ? name.split(' ') : '';
  const [winnerFirstName, winnerLastName] = winner
    ? winner?.name.split(' ')
    : '';

  const flagImage = mapCountryToFlagImg[country];
  const winnerFlag = winner ? mapCountryToFlagImg[winner.country] : '';

  const isCorrect = winner && winner.name === name;

  // The position will either be 1 or 2, 1 for the top bracket 2 for the bottom bracket
  const isPositionEven = isEven(position);

  const {
    config: { isSelectionsEnabled },
  } = useConfig();

  const handleClick = () => {
    if (!isSelectionsEnabled) return;
    setWinner({ player, matchups, matchupId });
  };

  return (
    <div>
      {isChampion && winner && <p className={styles.trophy}>🏆</p>}
      {winner && !isCorrect && !isPositionEven && (
        <p className={styles.strikethrough}>
          {firstName} {lastName}
        </p>
      )}
      <button
        className={clsx(
          styles.playerContainer,
          isCorrect && styles.greenBorder,
          winner && !isCorrect && styles.redBorder,
          isSelectionsEnabled && styles.isSelectionsEnabled
        )}
        onClick={handleClick}
      >
        <div className={styles.textFlagContainer}>
          {winner && !isCorrect ? (
            <div>
              <p className={styles.playerName}>{winnerFirstName}</p>
              <p className={styles.playerName}>{winnerLastName}</p>
            </div>
          ) : (
            <div>
              <p className={styles.playerName}>{firstName}</p>
              <p className={styles.playerName}>{lastName}</p>
            </div>
          )}
          {flagImage && (
            <Image
              src={winnerFlag || flagImage}
              alt={`${country} flag`}
              className={styles.flag}
              width="50"
              height="50"
            />
          )}
        </div>
      </button>
      {winner && !isCorrect && isPositionEven && (
        <p className={styles.strikethrough}>
          {firstName} {lastName}
        </p>
      )}
    </div>
  );
}
