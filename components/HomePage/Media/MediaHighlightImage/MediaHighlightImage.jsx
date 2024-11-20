import clsx from 'clsx';
import styles from './MediaHighlightImage.module.scss';
import Image from 'next/image';
import { getMedia } from '@/lib/contentful-utils';

const MediaComponent = ({ item }) => {
  const media = item.video ? getMedia(item.video) : getMedia(item.image);
  if (item.video) {
    return <video src={media.src} autoPlay muted loop playsInline></video>;
  }

  return <Image {...media} alt={media.alt} />;
};

export default function MediaHighlightImage({ media, currentIndex }) {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      {media.items.map((item, index) => {
        if (index === currentIndex)
          return (
            <div className={styles.image} key={`highlight-${item.title}`}>
              <MediaComponent item={item} />
            </div>
          );
      })}
      {media.items.map((item, index) => {
        if (index === currentIndex + 1)
          return (
            <div
              key={`highlight-next-${item.title}`}
              className={clsx(styles.image, styles.nextImage)}
            >
              <MediaComponent item={item} />
            </div>
          );
      })}
    </div>
  );
}
