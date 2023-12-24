import styles from './rainbow-border.module.scss';

export default function RainbowBorder() {
  return (
    <div className={styles.rainbowBorderContainer}>
      <div className={styles.rainbowBorder}></div>
      <div className={styles.rainbowBorder}></div>
      <div className={styles.rainbowBorder}></div>
      <div className={styles.rainbowBorder}></div>
    </div>
  );
}
