import styles from './login.module.scss';
import { initFirebaseAuth } from '@/components/login/firebase-utils';
import LoginWithEmailAndPassword from './login-with-email-and-password/login-with-email-and-password';
import Image from 'next/image';
import logo from '@/public/logo-center-white.png';
// import LoginWithGoogle from './login-with-google/login-with-google';

initFirebaseAuth();

export default function Login() {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.loginContainer}>
        <Image src={logo} alt="logo" className={styles.logo} />
        <p className={styles.signIn}>Sign in</p>
        <LoginWithEmailAndPassword />
        {/* <p className={styles.orText}>Or</p>
      <LoginWithGoogle /> */}
      </div>
    </div>
  );
}
