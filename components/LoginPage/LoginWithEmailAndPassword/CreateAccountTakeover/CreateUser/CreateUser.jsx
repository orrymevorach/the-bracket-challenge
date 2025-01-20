import Input from '@/components/shared/Input/Input';
import styles from './CreateUser.module.scss';
import { useState } from 'react';
import Button from '@/components/shared/Button/Button';
import { createFirebaseUser, errors } from '@/lib/firebase-utils';
import { joinLeague } from '@/lib/firebase';
import { useRouter } from 'next/router';
import { COOKIES, ROUTES } from '@/utils/constants';
import Cookies from 'js-cookie';
import logo from 'public/logo-center-white.png';
import Image from 'next/image';

export default function CreateUser({ email }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [emailInput, setEmailInput] = useState(email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChangePassword = e => {
    setPassword(e.target.value);
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      setError(errors.PASSWORDS_DO_NOT_MATCH.message);
      setIsLoading(false);
      return;
    }
    try {
      const response = await createFirebaseUser({
        email: emailInput,
        password,
        firstName,
        lastName,
        username,
      });
      if (response.error) {
        const errorCode = response.error.code;
        const errorMessage =
          errors[errorCode]?.message || errors.GENERIC.message;
        setError(errorMessage);
        setIsLoading(false);
        return;
      }
      Cookies.set(COOKIES.UID, response.id);
      if (router.query.leagueId) {
        await joinLeague({
          user: newUserResponse,
          leagueId: router.query.leagueId,
        });
      }
      setIsLoading(false);
      router.push({
        pathname: ROUTES.DASHBOARD,
      });
    } catch (error) {
      console.log('error', error);
      setError(error);
    }
  };
  return (
    <form action="#" className={styles.form} onSubmit={handleSubmit}>
      <Image src={logo} className={styles.logo} alt="logo" />
      <p className={styles.heading}>Sign Up</p>
      {error && <p className={styles.error}>{error}</p>}
      <Input
        type="text"
        id="first-name"
        placeholder="First Name"
        handleChange={e => setFirstName(e.target.value)}
        value={firstName}
        labelClassNames={styles.label}
        classNames={styles.inputContainer}
        required
      />
      <Input
        type="text"
        id="last-name"
        placeholder="Last Name"
        handleChange={e => setLastName(e.target.value)}
        value={lastName}
        labelClassNames={styles.label}
        classNames={styles.inputContainer}
        required
      />
      <Input
        type="text"
        id="set-username"
        placeholder="Username"
        handleChange={e => setUsername(e.target.value)}
        value={username}
        labelClassNames={styles.label}
        classNames={styles.inputContainer}
        required
      />
      <Input
        type="email"
        id="set-email"
        placeholder="Email Address"
        handleChange={e => setEmailInput(e.target.value)}
        value={emailInput}
        labelClassNames={styles.label}
        classNames={styles.inputContainer}
        required
      />
      <Input
        type="password"
        id="set-password"
        placeholder="Password"
        handleChange={handleChangePassword}
        value={password}
        labelClassNames={styles.label}
        classNames={styles.inputContainer}
        required
      />
      <Input
        type="password"
        id="confirm-password"
        placeholder="Confirm Password"
        handleChange={e => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        labelClassNames={styles.label}
        classNames={styles.inputContainer}
        required
      />
      <Button isLoading={isLoading} classNames={styles.button} isSecondary>
        Submit
      </Button>
    </form>
  );
}
