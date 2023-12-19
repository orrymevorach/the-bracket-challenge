import Image from 'next/image';
import styles from './coming-soon.module.scss';
import emptyBracket from 'public/empty-bracket.png';

export default function ComingSoon() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>NST Bracket Challenge</h1>
      <p className={styles.subheading}>Coming Soon...</p>
      <div className={styles.bracket}>
        {/* <Image src={emptyBracket} alt="" /> */}
      </div>
    </div>
  );
}
