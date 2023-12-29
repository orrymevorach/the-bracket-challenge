import styles from './footer.module.scss';
import clsx from 'clsx';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.innerContainer}>
        <div className={styles.column}>
          <p className={styles.text}>Natural Selection Bracket Challenge</p>
        </div>
        <div className={styles.column}>
          <p className={clsx(styles.contactUs, styles.text)}>Contact Us</p>
        </div>
      </div>
    </footer>
  );
}
