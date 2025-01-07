import clsx from 'clsx';
import styles from './Invitations.module.scss';

export default function Invitations({ invitations }) {
  return (
    <div className={styles.invitationsContainer}>
      <p className={styles.title}>Invitation Status</p>
      <ul className={styles.list}>
        {invitations.map(({ email, status }) => {
          return (
            <li key={`${email}-${status}`} className={styles.listItem}>
              {email}{' '}
              <span className={clsx(styles.status, styles[status])}>
                {status}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
