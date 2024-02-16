import { useState } from 'react';
import LeagueTakeoverLayout from '@/components/shared/league-takeover-layout/league-takeover-layout';
import { inviteMember } from '@/lib/mailgun';
import { useUser } from '@/context/user-context/user-context';
import Takeover from '@/components/shared/takeover/takeover';
import styles from './invite-member-takeover.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/shared/button/button';
import { validateEmail } from '@/utils/utils';

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
      admin: user.name,
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
        >
          <div className={styles.instructions}>
            <p>Or follow these instructions:</p>
            <ol>
              <li>
                Copy your league id:{' '}
                <span className={styles.italic}>{leagueId}</span>
              </li>
              <li>Send it to anyone you want to invite to your league</li>
              <li>
                Your friends can join your league by creating an account,
                clicking &quot;Join League&quot; on their dashboard, and
                entering the league id
              </li>
            </ol>
            <Button
              isLight
              handleClick={() => setShowTakeover(false)}
              classNames={styles.closeButton}
            >
              Close
            </Button>
          </div>
        </LeagueTakeoverLayout>
      ) : (
        <Takeover
          handleClose={() => setShowTakeover(false)}
          modalClassNames={styles.container}
        >
          <FontAwesomeIcon icon={faCheckCircle} color="#05bf78" size="xl" />
          <p className={styles.title}>Invite Sent!</p>
          <p className={styles.message}>
            Once your guest receives the invitation, they can follow in the
            instructions to join your league.
            <span className={styles.junkText}>
              <br />
              (If your guest does not receive the invite, ask them to check
              their junk mail inbox)
            </span>
          </p>

          <Button isSecondary handleClick={() => setIsSubmitted(false)}>
            Invite Another Member +
          </Button>
        </Takeover>
      )}
    </>
  );
}
