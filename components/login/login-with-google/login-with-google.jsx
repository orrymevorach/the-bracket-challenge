import styles from './login-with-google.module.scss';
import { initGoogleAuthWithFirebase } from '@/components/login/firebase-utils';
import Button from 'components/shared/button/button';

export default function LoginWithGoogle() {
  const signIn = async () => {
    try {
      await initGoogleAuthWithFirebase();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Button
      handleClick={signIn}
      classNames={styles.googleButton}
      isLight={true}
    >
      <p>Sign In With Google</p>
    </Button>
  );
}
