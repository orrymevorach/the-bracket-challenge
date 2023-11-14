import { useState } from 'react';
import Loader from '@/components/shared/loader/loader';
import Input from '@/components/shared/input/input';
import Button from '@/components/shared/button/button';
import styles from './set-bracket-name.module.scss';
import { createBracket } from '@/lib/airtable';
import useUser from '@/context/user-context/useUser';
import { useRouter } from 'next/router';
import { ROUTES } from '@/utils/constants';

export default function SetBracketName({ setIsSettingName }) {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [bracketName, setBracketName] = useState('');
  const router = useRouter();

  const handleSubmitForm = async e => {
    e.preventDefault();
    setIsLoading(true);
    const response = await createBracket({
      name: bracketName,
      memberId: user.id,
    });
    router.push(
      {
        pathname: ROUTES.BRACKET_CHALLENGE,
        query: {
          bracketId: response.id,
        },
      },
      undefined,
      { shallow: true }
    );
    setIsSettingName(false);
  };

  return (
    <div className={styles.bracketNameContainer}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <p className={styles.title}>Bracket name</p>
          <form
            action="#"
            onSubmit={e => handleSubmitForm(e)}
            className={styles.form}
          >
            <Input
              type="text"
              id="input"
              value={bracketName}
              handleChange={e => setBracketName(e.target.value)}
              classNames={styles.input}
            />
            <Button classNames={styles.button}>Submit</Button>
          </form>
        </>
      )}
    </div>
  );
}
