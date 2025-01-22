import styles from './MediaItems.module.scss';
import ProgressBar from '../ProgressBar/ProgressBar';
import clsx from 'clsx';
import useWindowSize from '@/hooks/useWindowSize';
import { getDuration } from '../Media';

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
  const { isMobile } = useWindowSize();

  return (
    <div>
      <div className={styles.mediaContainer}>
        {media.items.map((item, index) => {
          const isActive = index === currentIndex;
          const createdAtFormatted = timeAgo(item.createdAt);
          const duration = getDuration({ currentItem: item, isMobile }) / 1000;
          return (
            <div
              key={`row-${item.title}-${index}`}
              className={clsx(styles.button, isActive && styles.active)}
              onClick={() => setCurrentIndex(index)}
            >
              {!isMobile && <p className={styles.title}>{item.title}</p>}
              <ProgressBar isActive={isActive} duration={duration} />
              {/* {!isMobile && (
                <div className={styles.bottomRow}>
                  <p>{createdAtFormatted}</p>
                  <div className={styles.dot}></div>
                  <p>{item.tag}</p>
                </div>
              )} */}
            </div>
          );
        })}
      </div>
      {isMobile &&
        media.items.map((item, index) => {
          const isNextItem = index === currentIndex + 1;
          const currentItem = media.items[currentIndex];
          const duration = currentItem.duration || 7;
          if (isNextItem)
            return (
              <p
                className={styles.next}
                style={{ animationDuration: `${duration}s` }}
              >
                Next: {item.title}
              </p>
            );
        })}
    </div>
  );
}
