import Link from 'next/link';
import styles from './MediaHighlightTitle.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function MediaHighlightTitle({ media, currentIndex }) {
  return (
    <>
      {media.items.map((item, index) => {
        if (index === currentIndex) {
          if (item.link) {
            return (
              <Link
                key={`media-title-${item.title}`}
                className={styles.title}
                href={item.link}
                target="_blank"
              >
                <p>
                  {item.title} <FontAwesomeIcon icon={faLongArrowRight} />
                </p>
              </Link>
            );
          }
          return (
            <div key={`media-title-${item.title}`} className={styles.title}>
              <p>{item.title}</p>
            </div>
          );
        }
      })}
      {media.items.map((item, index) => {
        if (index === currentIndex + 1)
          return (
            <div
              key={`media-next-title-${item.title}`}
              className={clsx(styles.title, styles.nextTitle)}
            >
              <p>{item.title}</p>
            </div>
          );
      })}
    </>
  );
}
