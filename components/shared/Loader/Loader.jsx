import styles from './Loader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import Image from 'next/image';
import bracketLeft from 'public/bracket-left.jpg';

export default function Loader({
  isDotted = true,
  size = '2xl',
  classNames = '',
  color = 'white',
  isFullPage = false,
  isBrackets = false,
}) {
  if (isBrackets) {
    return (
      <div
        className={clsx(
          styles.bracketsContainer,
          classNames,
          isFullPage && styles.isFullPage
        )}
      >
        <Image
          className={styles.bracketLeft}
          src={bracketLeft}
          alt="bracket-left"
        />
        <p className={styles.text}>Loading...</p>
        <Image
          className={styles.bracketRight}
          src={bracketLeft}
          alt="bracket-right"
        />
      </div>
    );
  }
  if (isDotted) {
    return (
      <div
        className={clsx(
          styles['lds-ring'],
          classNames,
          isFullPage && styles.isFullPage
        )}
      >
        <FontAwesomeIcon
          icon={faSpinner}
          className={styles.dottedIcon}
          size={size}
          color={color}
        />
      </div>
    );
  }
  return (
    <div
      className={clsx(
        styles['lds-ring'],
        isFullPage && styles.isFullPage,
        classNames
      )}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
