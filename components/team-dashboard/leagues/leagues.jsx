import { useUser } from 'context/user-context/user-context';
import Loader from 'components/shared/loader/loader';
import Button from 'components/shared/button/button';
import styles from './leagues.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Teams() {
  const userData = useUser();

  if (userData.isLoading) return <Loader />;
  const leagues = userData.leagues || [];
  return (
    <div>
      <h3>Leagues</h3>
      {leagues.map(({ name }, index) => {
        return (
          <div key={name} className={styles.leagueContainer}>
            <p>
              {index + 1}. {name}
            </p>
            <p>Correct picks:</p>
            <Button href={`/league/${name}`}>View League</Button>
          </div>
        );
      })}
      <Button classNames={styles.createButton} href="/create-league">
        <FontAwesomeIcon icon={faPlus} className={styles.icon} />
        <p>Create League</p>
      </Button>
      <Button href="/join-league">Join League</Button>
    </div>
  );
}
