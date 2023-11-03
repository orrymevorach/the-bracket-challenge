import { getLeague } from '@/lib/airtable';
import Button from 'components/shared/button/button';
import Loader from 'components/shared/loader/loader';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './league.module.scss';

export default function League() {
  const [leagueData, setLeagueData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    query: { slug },
  } = useRouter();
  useEffect(() => {
    const handleGetLeagueData = async () => {
      const { league } = await getLeague({ name: slug });
      setLeagueData(league);
      setIsLoading(false);
    };
    handleGetLeagueData();
  }, [slug]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1>{slug}</h1>
      <div className={styles.titleRow}>
        <p className={styles.nameColumn}>Name</p>
        <p className={styles.pointsColumn}>Points</p>
      </div>
      {leagueData?.members.map(({ name }) => (
        <div key={name} className={styles.titleRow}>
          <p className={styles.nameColumn}>{name}</p>
          <p className={styles.pointsColumn}>1234</p>
          <Button>View Bracket</Button>
        </div>
      ))}
    </div>
  );
}
