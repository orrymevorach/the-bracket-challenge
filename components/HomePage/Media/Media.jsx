import { useEffect, useState } from 'react';
import MediaItems from './MediaItems/MediaItems';
import styles from './Media.module.scss';
import MediaHighlightImage from './MediaHighlightImage/MediaHighlightImage';
import MediaHighlightTitle from './MediaHighlightTitle/MediaHighlightTitle';
import useWindowSize from '@/hooks/useWindowSize';

export const getDuration = ({ currentItem, isMobile }) => {
  if (!currentItem?.duration && !currentItem?.mobileDuration) return 7000;
  if (isMobile && currentItem?.mobileDuration)
    return currentItem?.mobileDuration * 1000;
  return currentItem?.duration * 1000;
};

export default function Media({ media }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isMobile } = useWindowSize();

  useEffect(() => {
    const currentItem = media.items[currentIndex];
    const duration = getDuration({ currentItem, isMobile });
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % media.items.length);
    }, duration);
    return () => clearInterval(interval);
  }, [currentIndex, media.items.length, media.items, isMobile]);

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
