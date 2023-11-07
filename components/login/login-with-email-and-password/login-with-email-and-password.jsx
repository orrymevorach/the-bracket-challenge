import { useState } from 'react';
import styles from './login-with-email-and-password.module.scss';
import { useRouter } from 'next/router';
import { COOKIES, ROUTES } from 'utils/constants';
import Button from '@/components/shared/button/button';
import { errors, signInWithFirebaseEmailAndPassword } from '../firebase-utils';
import Input from '@/components/shared/input/input';
import CreateAccountTakeover from './create-account-takeover/create-account-takeover';
import Cookies from 'js-cookie';

export default function LoginWithEmailAndPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isCreatingNewUser, setIsCreatingNewUser] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const response = await signInWithFirebaseEmailAndPassword({
      email,
      password,
    });

    if (response?.user) {
      setError('');
      Cookies.set(COOKIES.UID, response.user.uid);
      router.push(ROUTES.DASHBOARD);
    } else if (
      response.error.code === 'auth/invalid-email' ||
      response.error.code === 'auth/user-not-found'
    ) {
      setIsCreatingNewUser(true);
      setIsLoading(false);
      return;
    } else if (response?.error) {
      const code = response.error.code;
      const errorMessage = errors[code]?.message || errors.GENERIC.message;
      setError(errorMessage);
    }
    setIsLoading(false);
  };

  const handleChangeEmail = e => {
    setError('');
    setEmail(e.target.value.toLowerCase());
  };

  const handleChangePassword = e => {
    setError('');
    setPassword(e.target.value);
  };

  return (
    <>
      {isCreatingNewUser ? (
        <CreateAccountTakeover
          email={email}
          setIsCreatingNewUser={setIsCreatingNewUser}
        />
      ) : (
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
            error={error}
          />
          <Input
            type="password"
            id="password"
            handleChange={e => handleChangePassword(e)}
            label="Password"
            value={password}
            classNames={styles.passwordInput}
          />
          <Button isLoading={isLoading} classNames={styles.submit}>
            Log in
          </Button>
        </form>
      )}
    </>
  );
}
