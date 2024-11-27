import { useEffect, useState } from 'react';
import MediaItems from './MediaItems/MediaItems';
import styles from './Media.module.scss';
import MediaHighlightImage from './MediaHighlightImage/MediaHighlightImage';
import MediaHighlightTitle from './MediaHighlightTitle/MediaHighlightTitle';

export default function Media({ media }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentItem = media.items[currentIndex];
    const duration = currentItem.duration * 1000 || 7000;
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % media.items.length);
    }, duration);
    return () => clearInterval(interval);
  }, [currentIndex, media.items.length, media.items]);

  return (
    <>
      <MediaHighlightImage media={media} currentIndex={currentIndex} />
      <div className={styles.gradient}></div>
      <div className={styles.innerContainer}>
        <MediaHighlightTitle media={media} currentIndex={currentIndex} />
        <MediaItems
          media={media}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </>
  );
}
