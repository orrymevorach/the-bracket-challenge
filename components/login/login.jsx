import styles from './login.module.scss';
import { initFirebaseAuth } from '@/components/login/firebase-utils';
import LoginWithEmailAndPassword from './login-with-email-and-password/login-with-email-and-password';
// import LoginWithGoogle from './login-with-google/login-with-google';

initFirebaseAuth();

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>
        The
        <br />
        Bracket
        <br />
        Challenge
      </h1>
      <LoginWithEmailAndPassword />
      {/* <p className={styles.orText}>Or</p>
      <LoginWithGoogle /> */}
    </div>
  );
}
