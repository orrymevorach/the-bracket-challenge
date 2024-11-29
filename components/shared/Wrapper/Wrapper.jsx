import styles from './Wrapper.module.scss';
import clsx from 'clsx';

export default function Wrapper({ children, classNames = {} }) {
  return <div className={clsx(styles.wrapper, classNames)}>{children}</div>;
}
