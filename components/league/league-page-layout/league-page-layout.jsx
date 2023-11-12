import styles from './league-page-layout.module.scss';
import Loader from 'components/shared/loader/loader';
import Layout from '@/components/shared/layout/layout';
import { useLeagueConfig } from '@/context/league-config-context/league-config-context';

export default function LeaguePageLayout({ children, title }) {
  const { name } = useLeagueConfig();
  return (
    <Layout>
      {name ? (
        <>
          <p className={styles.heading}>{title}</p>
          <p className={styles.leagueName}>{name}</p>
        </>
      ) : (
        <Loader classNames={styles.loader} />
      )}
      {children}
    </Layout>
  );
}
