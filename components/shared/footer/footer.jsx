import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <p className={styles.text}>Natural Selection Bracket Challenge</p>
      </div>
      <div className={styles.column}>
        <p className={styles.text}>
          Built by{' '}
          <a
            href="https://www.instagram.com/orrymevorach/"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Orry Mevorach
          </a>{' '}
          and{' '}
          <a
            href="https://www.instagram.com/coreyjacobs7/"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Corey Jacobs
          </a>
        </p>
      </div>
      <div className={styles.column}>
        <p className={styles.text}>Contact Us</p>
      </div>
    </footer>
  );
}
