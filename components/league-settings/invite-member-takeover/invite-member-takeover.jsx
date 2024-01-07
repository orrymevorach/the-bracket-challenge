import { useState } from 'react';
import LeagueTakeoverLayout from '@/components/shared/league-takeover-layout/league-takeover-layout';
import { inviteMember } from '@/lib/mailgun';
import { useUser } from '@/context/user-context/user-context';
import Takeover from '@/components/shared/takeover/takeover';
import styles from './invite-member-takeover.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/shared/button/button';

export default function InviteMemberTakeover({
  setShowTakeover,
  classNames = '',
  leagueId,
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [memberEmail, setMemberEmail] = useState('');
  const user = useUser();
  const handleSubmit = async () => {
    const res = await inviteMember({
      email: memberEmail,
      leagueId,
      admin: user.name,
    });
    if (res) {
      setIsSubmitted(true);
      setMemberEmail('')
    }
  };

  return (
    <>
      {!isSubmitted ? (
        <LeagueTakeoverLayout
          setShowTakeover={setShowTakeover}
          handleSubmit={handleSubmit}
          title="Invite Member"
          label="Email Address"
          buttonLabel="Invite"
          inputValue={memberEmail}
          setInputValue={setMemberEmail}
          classNames={classNames}
        />
      ) : (
        <Takeover
          handleClose={() => setShowTakeover(false)}
          modalClassNames={styles.container}
        >
          <FontAwesomeIcon icon={faCheckCircle} color="#05bf78" size="xl" />
          <p className={styles.title}>Success!</p>
          <p className={styles.message}>
            An invite has been sent to: {' '} {memberEmail}
          </p>
          <Button isSecondary handleClick={() => setIsSubmitted(false)}>Invite Another Member +</Button>
        </Takeover>
      )}
    </>
  );
}
