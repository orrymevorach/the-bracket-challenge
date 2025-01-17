import Link from 'next/link';
import styles from './Footer.module.scss';
import clsx from 'clsx';
import BrandBanner from '../BrandBanner/BrandBanner';

export default function Footer({ hideMarginTop = false, brandLogos = [] }) {
  return (
    <footer
      className={clsx(styles.footer, hideMarginTop && styles.hideMarginTop)}
    >
      <BrandBanner brandLogos={brandLogos} />
      <div className={styles.innerContainer}>
        <div className={styles.column}>
          <p className={styles.text}>The Bracket Challenge</p>
        </div>
        <div className={styles.column}>
          <Link href="/contact" className={clsx(styles.contactUs, styles.text)}>
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
