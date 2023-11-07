import Input from '@/components/shared/input/input';
import styles from './create-user.module.scss';
import { useState } from 'react';
import Button from '@/components/shared/button/button';
import { createFirebaseUser, errors } from '../../../firebase-utils';
import { createUser } from '@/lib/airtable';
import { useRouter } from 'next/router';
import { COOKIES, ROUTES } from '@/utils/constants';
import Cookies from 'js-cookie';

export default function CreateUser({ email }) {
  const [name, setName] = useState('');
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
    try {
      const response = await createFirebaseUser({
        email: emailInput,
        password,
      });
      if (response.error) {
        const errorCode = response.error.code;
        const errorMessage =
          errors[errorCode]?.message || errors.GENERIC.message;
        setError(errorMessage);
        setIsLoading(false);
        return;
      }
      const newUserResponse = await createUser({
        uid: response.user.uid,
        name: name,
        email: emailInput,
      });
      Cookies.set(COOKIES.UID, response.user.uid);
      setIsLoading(false);
      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      console.log('error', error);
      setError(error);
    }
  };
  return (
    <form action="#" className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.heading}>Create User</p>
      {error && <p className={styles.error}>{error}</p>}
      <Input
        type="text"
        id="set-name"
        label="Name"
        handleChange={e => setName(e.target.value)}
        value={name}
        labelClassNames={styles.label}
        classNames={styles.inputContainer}
      />
      <Input
        type="email"
        id="set-email"
        label="Email Address"
        handleChange={e => setEmailInput(e.target.value)}
        value={emailInput}
        labelClassNames={styles.label}
        classNames={styles.inputContainer}
      />
      <Input
        type="password"
        id="set-password"
        label="Password"
        handleChange={handleChangePassword}
        value={password}
        labelClassNames={styles.label}
        classNames={styles.inputContainer}
      />
      <Input
        type="password"
        id="confirm-password"
        label="Confirm Password"
        handleChange={e => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        labelClassNames={styles.label}
        classNames={styles.inputContainer}
      />
      <Button isLoading={isLoading} classNames={styles.button}>
        Submit
      </Button>
    </form>
  );
}
