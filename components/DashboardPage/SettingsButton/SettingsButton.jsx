import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import styles from './SettingsButton.module.scss';
import clsx from 'clsx';

export default function SettingsButton({ href, classNames = {}, text = '' }) {
  return (
    <Link href={href} className={clsx(styles.button, classNames)}>
      <p className={styles.text}>{text && `${text} `}Settings</p>{' '}
      <FontAwesomeIcon icon={faGear} size="sm" />
    </Link>
  );
}
