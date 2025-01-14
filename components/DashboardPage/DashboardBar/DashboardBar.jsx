import Wrapper from '@/components/shared/Wrapper/Wrapper';
import styles from './DashboardBar.module.scss';
import { useUser } from '@/context/user-context/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import LeagueTakeoverLayout from '@/components/shared/LeagueTakeoverLayout/LeagueTakeoverLayout';
import { updateRecord } from '@/lib/airtable-utils';

export default function DashboardBar({ title = 'Dashboard', children }) {
  const [showEditBracketNameTakeover, setShowEditBracketNameTakeover] =
    useState(false);
  const [newUsername, setNewUsername] = useState('');
  const user = useUser();

  const handleSubmit = async e => {
    await updateRecord({
      tableId: 'Members',
      recordId: user.id,
      newFields: {
        Username: newUsername,
      },
    });
    window.location.reload();
  };

  const firstInitial = user?.firstName?.charAt(0) || '';
  const lasInitial = user?.lastName?.charAt(0) || '';

  return (
    <>
      {showEditBracketNameTakeover && (
        <LeagueTakeoverLayout
          setShowTakeover={setShowEditBracketNameTakeover}
          handleSubmit={handleSubmit}
          title="Edit Username"
          label="Enter a new username"
          buttonLabel="Submit"
          inputValue={newUsername}
          setInputValue={setNewUsername}
        />
      )}
      <div className={styles.container}>
        <Wrapper classNames={styles.innerContainer}>
          <div className={styles.initials}>
            <p>{`${firstInitial}${lasInitial}`}</p>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.dashboardText}>{title}</p>
            <p className={styles.username}>
              {user.username}{' '}
              <button
                className={styles.editButton}
                onClick={() => setShowEditBracketNameTakeover(true)}
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  color="white"
                  className={styles.editIcon}
                />
              </button>
            </p>
          </div>
          {children}
        </Wrapper>
      </div>
    </>
  );
}
