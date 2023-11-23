import styles from './footer.module.scss';
import clsx from 'clsx';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <p className={styles.text}>Natural Selection Bracket Challenge</p>
      </div>
      <div className={styles.column}>
        <p className={styles.text}>
          Built by <span className={styles.link}>Orry Mevorach</span> and{' '}
          <span className={styles.link}>Corey Jacobs</span>
        </p>
        <p className={clsx(styles.contactUs, styles.text)}>Contact Us 🤙</p>
      </div>
    </footer>
  );
}
