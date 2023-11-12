import styles from './league-page-layout.module.scss';
import Loader from 'components/shared/loader/loader';
import { useRouter } from 'next/router';
import Layout from '@/components/shared/layout/layout';
import useGetLeagueConfig from '../useGetLeagueConfig';

export default function LeaguePageLayout({ children, title }) {
  const {
    query: { slug },
  } = useRouter();
  const { name } = useGetLeagueConfig({ slug });
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
