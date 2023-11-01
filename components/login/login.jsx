import styles from './login.module.scss';
import { initFirebaseAuth, auth } from 'firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/shared/button/button';

initFirebaseAuth();

const buttonDataMap = {
  google: {
    icon: faGoogle,
    classNames: styles.googleButton,
    text: 'Sign In With Google',
  },
  email: {
    icon: faEnvelope,
    text: 'Sign In With Email',
  },
  create: {
    icon: faPlus,
    text: 'Create Account',
  },
};

export default function Login() {
  const provider = new GoogleAuthProvider();
  const authButtonData = Object.values(buttonDataMap);
  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
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
      <div className={styles.buttonContainer}>
        {authButtonData.map(({ icon, classNames, text }) => (
          <Button
            key={text}
            handleClick={signIn}
            classNames={classNames}
            icon={icon}
          >
            {text}
          </Button>
        ))}
      </div>
    </div>
  );
}
