import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './closeButton.module.scss';
import clsx from 'clsx';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function CloseButton({ handleClick, classNames = '' }) {
  return (
    <button
      onClick={handleClick}
      className={clsx(styles.closeButton, classNames)}
    >
      <FontAwesomeIcon icon={faTimes} size="xl" />
    </button>
  );
}
