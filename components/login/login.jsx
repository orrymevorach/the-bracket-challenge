import styles from './login.module.scss';
import {
  initFirebaseAuth,
  auth,
  initGoogleAuthWithFirebase,
} from '@/components/login/firebase-utils';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/shared/button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginWithEmailAndPassword from './login-with-email-and-password/login-with-email-and-password';

initFirebaseAuth();

const buttonDataMap = {
  google: {
    icon: faGoogle,
    classNames: styles.googleButton,
    text: 'Sign In With Google',
  },
  create: {
    icon: faPlus,
    text: 'Create Account',
  },
};

export default function Login() {
  const authButtonData = Object.values(buttonDataMap);
  const signIn = async () => {
    try {
      await initGoogleAuthWithFirebase();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>
        Natural Selection Tour <br />
        Bracket Challenge
      </h1>
      <LoginWithEmailAndPassword />
      <div className={styles.buttonContainer}>
        {authButtonData.map(({ icon, classNames, text }) => (
          <Button key={text} handleClick={signIn} classNames={classNames}>
            <FontAwesomeIcon icon={icon} />
            <p>{text}</p>
          </Button>
        ))}
      </div>
    </div>
  );
}
