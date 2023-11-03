import { useUser } from 'context/user-context/user-context';
import Loader from 'components/shared/loader/loader';
import Button from 'components/shared/button/button';
import styles from './leagues.module.scss';

export default function Teams() {
  const userData = useUser();

  if (userData.isLoading) return <Loader />;
  const leagues = userData.leagues || [];
  return (
    <div>
      <h3>Leagues</h3>
      {leagues.map(({ name }) => {
        return (
          <div key={name} className={styles.leagueContainer}>
            <p>{name}</p>
            <Button href={`/league/${name}`}>View League</Button>
          </div>
        );
      })}
    </div>
  );
}
