import { useState } from 'react';
import LeagueTakeoverLayout from '@/components/shared/LeagueTakeoverLayout/LeagueTakeoverLayout';
import { inviteMember } from '@/lib/mailgun';
import { useUser } from '@/context/user-context/user-context';
import Takeover from '@/components/shared/Takeover/Takeover';
import styles from './InviteMemberTakeover.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/shared/Button/Button';
import { validateEmail } from '@/utils/utils';
import { COLOURS } from '@/utils/constants';

export default function InviteMemberTakeover({ setShowTakeover, leagueId }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [memberEmail, setMemberEmail] = useState('');
  const [error, setError] = useState('');
  const user = useUser();
  const handleSubmit = async () => {
    const isEmailValid = validateEmail(memberEmail);
    if (!isEmailValid) {
      setError('Please enter a valid email');
      return;
    }
    const res = await inviteMember({
      email: memberEmail,
      leagueId,
      admin: user.firstName,
    });
    if (res) {
      setIsSubmitted(true);
      setMemberEmail('');
    }
  };

  const handleChange = value => {
    setError('');
    setMemberEmail(value);
  };

  return (
    <>
      {!isSubmitted ? (
        <LeagueTakeoverLayout
          setShowTakeover={setShowTakeover}
          handleSubmit={handleSubmit}
          title="Invite Member"
          label="Invite a friend by entering their email address:"
          buttonLabel="Invite"
          inputValue={memberEmail}
          setInputValue={handleChange}
          classNames={styles.container}
          error={error}
        />
      ) : (
        <Takeover
          handleClose={() => setShowTakeover(false)}
          modalClassNames={styles.container}
        >
          <FontAwesomeIcon
            icon={faCheckCircle}
            color={COLOURS.PURPLE}
            size="2x"
          />
          <p className={styles.title}>Invite Sent!</p>
          <p className={styles.junkText}>
            (If your guest does not receive the invite, ask them to check their
            junk mail inbox)
          </p>
          <div className={styles.buttonsContainer}>
            <Button
              isSecondary
              handleClick={() => setIsSubmitted(false)}
              classNames={styles.inviteButton}
            >
              Invite Another Member <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
            <Button
              isSecondary
              handleClick={() => setShowTakeover(false)}
              classNames={styles.closeButton}
            >
              Close
            </Button>
          </div>
        </Takeover>
      )}
    </>
  );
}
