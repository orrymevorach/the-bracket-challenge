import styles from './Loader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export default function Loader({
  isDotted = true,
  size = '2xl',
  classNames = '',
  color = 'white',
  isFullPage = false,
}) {
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
