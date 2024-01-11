import styles from './coming-soon.module.scss';

export default function ComingSoon() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>NST Bracket Challenge</h1>
      <p className={styles.subheading}>Coming Soon...</p>
      <div className={styles.bracket}></div>
    </div>
  );
}
