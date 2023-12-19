import { getPageLoadData } from '@/lib/contentful';
import styles from './404.module.scss';
import Image from 'next/image';
import { ROUTES } from '@/utils/constants';
import Meta from '@/components/shared/head/head';

export default function PageNotFound() {
  return (
    <>
      <Meta />
      <div className={styles.pageNotFoundContainer}>
        {/* <Image
        src={Rainbow}
        alt="Highlands Music Festival logo"
        className={styles.logo}
        priority
        quality={10}
      /> */}
        <h2 className={styles.title}>404: Page Not Found</h2>
        <p className={styles.text}>
          Apologies, it appears this page does not exist.
        </p>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: ROUTES.PAGE_NOT_FOUND,
  });

  return {
    props: {
      ...pageLoadData,
    },
  };
}
