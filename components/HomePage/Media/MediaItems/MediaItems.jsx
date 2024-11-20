import styles from './MediaItems.module.scss';
import ProgressBar from '../ProgressBar/ProgressBar';
import clsx from 'clsx';

function timeAgo(timestamp) {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMs = now - time;
  const diffInHours = diffInMs / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h`;
  } else {
    const diffInDays = diffInHours / 24;
    return `${Math.floor(diffInDays)}d`;
  }
}

export default function MediaItems({ media, currentIndex, setCurrentIndex }) {
  return (
    <div className={styles.mediaContainer}>
      {media.items.map((item, index) => {
        const isActive = index === currentIndex;
        const createdAtFormatted = timeAgo(item.createdAt);
        return (
          <button
            key={`row-${item.title}-${index}`}
            className={clsx(styles.button, isActive && styles.active)}
            onClick={() => setCurrentIndex(index)}
          >
            <p className={styles.title}>{item.title}</p>
            <ProgressBar isActive={isActive} />
            <div className={styles.bottomRow}>
              <p>{createdAtFormatted}</p>
              <div className={styles.dot}></div>
              <p>{item.tag}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
