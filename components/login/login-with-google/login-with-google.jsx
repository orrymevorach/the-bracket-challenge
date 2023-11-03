import styles from './login-with-google.module.scss';
import { initGoogleAuthWithFirebase } from '@/components/login/firebase-utils';
import { ROUTES } from '@/utils/constants';
import Button from 'components/shared/button/button';
import { useRouter } from 'next/router';

export default function LoginWithGoogle() {
  const router = useRouter();
  const signIn = async () => {
    try {
      const response = await initGoogleAuthWithFirebase();
      if (response.user) router.push(ROUTES.DASHBOARD);
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
