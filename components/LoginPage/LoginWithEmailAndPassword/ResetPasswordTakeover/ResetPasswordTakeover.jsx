import Takeover from '@/components/shared/Takeover/Takeover';
import Button from '@/components/shared/Button/Button';
import styles from './ResetPasswordTakeover.module.scss';
import Input from '@/components/shared/Input/Input';
import { useState } from 'react';
import { sendFirebasePasswordResetEmail } from '../../../../lib/firebase-utils';

export default function ResetPasswordTakeover({ setIsResettingPassword }) {
  const [email, setEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    sendFirebasePasswordResetEmail({ email });
    setShowConfirmation(true);
  };

  return (
    <Takeover handleClose={() => setIsResettingPassword(false)}>
      {!showConfirmation ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.text}>
            Enter your email address, and we will send you a password reset
            link.
          </p>
          <Input value={email} handleChange={e => setEmail(e.target.value)} />
          <Button classNames={styles.button} isSecondary>
            Send Password Reset Email
          </Button>
          <Button isLight handleClick={() => setIsResettingPassword(false)}>
            Cancel
          </Button>
        </form>
      ) : (
        <>
          <p className={styles.text}>
            A password reset link has been sent to {email}
          </p>
          <Button handleClick={() => setIsResettingPassword(false)}>
            Close
          </Button>
        </>
      )}
    </Takeover>
  );
}
