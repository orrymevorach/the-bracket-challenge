import styles from './button.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

export default function Button({ handleClick, children, classNames, icon }) {
  return (
    <button onClick={handleClick} className={clsx(styles.button, classNames)}>
      {icon && <FontAwesomeIcon icon={icon} />}
      <p>{children}</p>
    </button>
  );
}
