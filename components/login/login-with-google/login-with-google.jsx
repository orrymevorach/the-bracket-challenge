import { createUser, getUser } from '@/lib/airtable';
import styles from './login-with-google.module.scss';
import { initGoogleAuthWithFirebase } from '@/components/login/firebase-utils';
import { COOKIES, ROUTES } from '@/utils/constants';
import Button from 'components/shared/button/button';
import Cookies from 'js-cookie';

export default function LoginWithGoogle() {
  const signIn = async () => {
    try {
      const response = await initGoogleAuthWithFirebase();
      const user = await getUser({ uid: response.user.uid });
      const userExists = !!user.name;
      if (!userExists) {
        const newUserResponse = await createUser({
          uid: response.user.uid,
          name: response.user.displayName,
          email: response.user.email,
        });
      }
      Cookies.set(COOKIES.UID, response.user.uid);
      if (response.user) window.location = ROUTES.DASHBOARD;
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
