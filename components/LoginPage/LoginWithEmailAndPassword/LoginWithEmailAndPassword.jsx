import { useState } from 'react';
import styles from './LoginWithEmailAndPassword.module.scss';
import { useRouter } from 'next/router';
import { COOKIES, ROUTES } from 'utils/constants';
import Button from '@/components/shared/Button/Button';
import { errors, signInWithFirebaseEmailAndPassword } from '../firebase-utils';
import Input from '@/components/shared/Input/Input';
import CreateAccountTakeover from './CreateAccountTakeover/CreateAccountTakeover';
import Cookies from 'js-cookie';
import PromptNewUserTakeover from './PromptNewUserTakeover/PromptNewUserTakeover';
import ResetPasswordTakeover from './ResetPasswordTakeover/ResetPasswordTakeover';
import globalStyles from '@/styles/globalStyles.module.scss';
import clsx from 'clsx';

export default function LoginWithEmailAndPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isCreatingNewUser, setIsCreatingNewUser] = useState(false);
  const [isUserPromptedToCreateAccount, setIsUserPromptedToCreateAccount] =
    useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

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
      if (router.query.redirect === 'true') {
        router.back();
      } else {
        router.push(ROUTES.DASHBOARD);
      }
    } else if (
      response.error.code === 'auth/invalid-email' ||
      response.error.code === 'auth/user-not-found'
    ) {
      setIsUserPromptedToCreateAccount(true);
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
      {isCreatingNewUser && (
        <CreateAccountTakeover
          email={email}
          setIsCreatingNewUser={setIsCreatingNewUser}
        />
      )}
      {isUserPromptedToCreateAccount && (
        <PromptNewUserTakeover
          setIsUserPromptedToCreateAccount={setIsUserPromptedToCreateAccount}
          setIsCreatingNewUser={setIsCreatingNewUser}
        />
      )}
      {isResettingPassword && (
        <ResetPasswordTakeover
          setIsResettingPassword={setIsResettingPassword}
        />
      )}

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
          value={email}
          error={error}
          placeholder="Email address*"
        />
        <Input
          type="password"
          id="password"
          handleChange={e => handleChangePassword(e)}
          placeholder="Password"
          value={password}
          classNames={styles.passwordInput}
        />
        <Button isLoading={isLoading} classNames={styles.submit} isSecondary>
          Continue
        </Button>
        <div
          className={clsx(
            globalStyles.row,
            globalStyles.alignItemsCenter,
            styles.signUpRow
          )}
        >
          <p>Don&apos;t have an account?</p>
          <button
            onClick={() => setIsCreatingNewUser(true)}
            type="button"
            className={styles.link}
          >
            Sign up
          </button>
        </div>

        <button
          onClick={() => setIsResettingPassword(true)}
          type="button"
          className={styles.link}
        >
          Forgot Password
        </button>
      </form>
    </>
  );
}
