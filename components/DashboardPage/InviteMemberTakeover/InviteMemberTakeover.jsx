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
import Invitations from './Invitations/Invitations';
import { COLORS } from '@/utils/constants';
import CopyToClipboard from '@/components/shared/CopyToClipboard/CopyToClipboard';

export default function InviteMemberTakeover({ setShowTakeover, leagueData }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [memberEmail, setMemberEmail] = useState('');
  const [error, setError] = useState('');
  const existingInvitations = leagueData?.invitations || [];
  const [invitations, setInvitations] = useState(existingInvitations);

  const user = useUser();

  const handleSubmit = async () => {
    const isEmailValid = validateEmail(memberEmail);
    if (!isEmailValid) {
      setError('Please enter a valid email');
      return;
    }

    const res = await inviteMember({
      email: memberEmail,
      leagueId: leagueData.id,
      admin: user.firstName,
      invitations,
      sport: leagueData.sport,
    });

    setInvitations(res.invitations);
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
          <div className={styles.groupInvite}>
            <p className={styles.or}>Or</p>
            <p>Copy and paste your League ID into the group chat</p>
            <CopyToClipboard
              text={leagueData.id}
              classNames={styles.copyToClipboard}
            />
          </div>
          {invitations.length > 0 && <Invitations invitations={invitations} />}
        </LeagueTakeoverLayout>
      ) : (
        <Takeover
          handleClose={() => setShowTakeover(false)}
          modalClassNames={styles.container}
        >
          <FontAwesomeIcon
            icon={faCheckCircle}
            color={COLORS.GREEN}
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
          {invitations.length > 0 && <Invitations invitations={invitations} />}
        </Takeover>
      )}
    </>
  );
}
