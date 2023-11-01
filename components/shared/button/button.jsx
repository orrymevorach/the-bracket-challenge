import styles from './button.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';

export default function Button({
  handleClick,
  children,
  classNames,
  icon,
  href,
}) {
  if (href)
    return (
      <Link href={href} className={clsx(styles.button, classNames)}>
        {icon && <FontAwesomeIcon icon={icon} />}
        <p>{children}</p>
      </Link>
    );
  return (
    <button onClick={handleClick} className={clsx(styles.button, classNames)}>
      {icon && <FontAwesomeIcon icon={icon} />}
      <p>{children}</p>
    </button>
  );
}
