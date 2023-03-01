import styles from './loader.module.scss';
import clsx from 'clsx';

export default function Loader({ isFullPage = true }) {
  return (
    <div className={clsx(isFullPage && styles.isFullPage)}>
      <div className={styles.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
