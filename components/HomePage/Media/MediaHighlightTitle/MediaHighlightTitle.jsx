import Link from 'next/link';
import styles from './MediaHighlightTitle.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import RichText from '@/components/shared/RichText/RichText';

export default function MediaHighlightTitle({ media, currentIndex }) {
  return (
    <>
      {media.items.map((item, index) => {
        const Component = item.link ? Link : 'div';
        if (index === currentIndex) {
          return (
            <Component
              key={`media-title-${item.title}`}
              href={item.link}
              target="_blank"
            >
              <p className={styles.title}>
                {item.title}{' '}
                {item.link && <FontAwesomeIcon icon={faLongArrowRight} />}
              </p>

              {item.description && (
                <RichText
                  json={item.description}
                  classNames={styles.description}
                />
              )}
            </Component>
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
