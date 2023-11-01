import { useEffect, useState } from 'react';
import styles from './login-with-email-and-password.module.scss';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { COOKIES, ROUTES } from 'utils/constants';
import Button from '@/components/shared/button/button';
import { signInWithFirebaseEmailAndPassword } from '../firebase-utils';
import Input from '@/components/shared/input/input';

// const useLoginExistingUserOnPageLoad = () => {
//   const router = useRouter();
//   useEffect(() => {
//     const userRecordCookie = Cookies.get(COOKIES.USER_RECORD);
//     if (userRecordCookie) {
//       router.push({
//         pathname: ROUTES.USERS,
//       });
//     }
//   }, [router]);
// };

const errors = {
  'auth/invalid-email': {
    type: 'email',
    message:
      'We do not have a record of this email. Please contact the admin of your Festival Logistics space',
  },
  'auth/missing-password': {
    type: 'password',
    message: 'Please enter your password',
  },
  'auth/operation-not-allowed': {
    type: 'password',
    message:
      'This password does not match the one we have on file for this email. Please double check your spelling, or contact your space admin',
  },
  GENERIC: {
    type: 'email',
    message:
      "We're sorry, an unknown error has occured. Please contact your space admin",
  },
};

export default function LoginWithEmailAndPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // useLoginExistingUserOnPageLoad();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const response = await signInWithFirebaseEmailAndPassword({
      email,
      password,
    });

    if (response?.user) {
      setEmailError('');
      setPasswordError('');
      router.push(ROUTES.USERS);
    } else if (response?.error) {
      const code = response.error.code;
      const errorMessage = errors[code].message || errors.GENERIC;
      const type = errors[code].type;
      if (type === 'email') setEmailError(errorMessage);
      if (type === 'password') setPasswordError(errorMessage);
    }
    setIsLoading(false);
  };

  const handleChangeEmail = e => {
    setEmailError('');
    setPasswordError('');
    setEmail(e.target.value.toLowerCase());
  };

  const handleChangePassword = e => {
    setEmailError('');
    setPasswordError('');
    setPassword(e.target.value);
  };

  return (
    <form
      action="#"
      onSubmit={e => handleSubmit(e)}
      className={styles.container}
    >
      <Input
        type="email"
        id="email"
        handleChange={e => handleChangeEmail(e)}
        classNames={styles.emailInput}
        label="Email"
        value={email}
        error={emailError}
      />
      <Input
        type="password"
        id="password"
        handleChange={e => handleChangePassword(e)}
        label="Password"
        value={password}
        classNames={styles.passwordInput}
        error={passwordError}
      />
      <Button isLoading={isLoading} classNames={styles.submit}>
        Log in
      </Button>
    </form>
  );
}
