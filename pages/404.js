/* eslint-disable @next/next/no-html-link-for-pages */
import { getPageLoadData } from '@/lib/contentful';
import styles from './404.module.scss';
import Image from 'next/image';
import { ROUTES } from '@/utils/constants';
import Meta from '@/components/shared/head/head';

export default function PageNotFound() {
  return (
    <>
      <Meta title="Page Not Found" />
      <div className={styles.pageNotFoundContainer}>
        {/* <Image
        src={Rainbow}
        alt="Highlands Music Festival logo"
        className={styles.logo}
        priority
        quality={10}
      /> */}
        <h2 className={styles.title}>Oh no! Something went wrong.</h2>
        <p className={styles.text}>
          Try <a href="/">logging in</a> again, or{' '}
          <a href="/contact">contact us</a> for support.
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
