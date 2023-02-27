import styles from './login.module.scss';
import { initFirebaseAuth, auth } from 'firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/button/button';

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
      const {
        user: { uid },
      } = await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.loginContainer}>
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
  );
}
