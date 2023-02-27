import styles from './player.module.scss';
import { useMatchups } from 'context/matchup-context/matchup-context';
import Image from 'next/image';

export default function Player(player) {
  const { name, round, country } = player;
  const { setWinner, setRoundOneWinner } = useMatchups();

  const handleClick = round === 1 ? setRoundOneWinner : setWinner;

  const mapCountryToFlagImg = {
    USA: '/flags/USA.svg',
    Canada: '/flags/canada.svg',
    Norway: '/flags/norway.svg',
    Finland: '/flags/finland.svg',
    ['New Zealand']: '/flags/new-zealand.svg',
    Austria: '/flags/austria.svg',
  };
  const flagImage = mapCountryToFlagImg[country];
  const [firstName, lastName] = name ? name.split(' ') : '';
  return (
    <button
      className={styles.playerContainer}
      onClick={() => handleClick(player)}
    >
      <div className={styles.textFlagContainer}>
        <div>
          <p className={styles.playerName}>{firstName}</p>
          <p className={styles.playerName}>{lastName}</p>
        </div>
        {flagImage && (
          <Image
            src={flagImage}
            alt={`${country} flag`}
            className={styles.flag}
            width="50"
            height="50"
          />
        )}
      </div>
    </button>
  );
}
