import { useEffect, useState } from 'react';
import MediaItems from './MediaItems/MediaItems';
import styles from './Media.module.scss';
import MediaHighlightImage from './MediaHighlightImage/MediaHighlightImage';
import MediaHighlightTitle from './MediaHighlightTitle/MediaHighlightTitle';

export default function Media({ media }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % media.items.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [currentIndex, media.items.length]);

  return (
    <div className={styles.container}>
      <MediaHighlightImage media={media} currentIndex={currentIndex} />
      <div className={styles.innerContainer}>
        <MediaHighlightTitle media={media} currentIndex={currentIndex} />
        <MediaItems
          media={media}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </div>
  );
}
