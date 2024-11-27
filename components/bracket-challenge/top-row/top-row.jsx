import { useEffect, useState } from 'react';
import styles from './top-row.module.scss';
import { getBracketName } from '@/lib/airtable';
import { useUser } from '@/context/user-context/user-context';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export default function TopRow({ bracketRecId, leagueId }) {
  const [bracketName, setBracketName] = useState('');
  const user = useUser();
  const isCurrentUsersBrackets = user?.brackets.includes(bracketRecId);

  useEffect(() => {
    const getBracketNameData = async () => {
      const bracket = await getBracketName({ id: bracketRecId });
      setBracketName(bracket.name);
    };
    if (bracketRecId && !bracketName) {
      getBracketNameData();
    }
  }, [bracketRecId, bracketName]);
  return (
    <div className={styles.topContainer}>
      <div>
        <p className={styles.leagueName}>{bracketName}</p>
      </div>
      {isCurrentUsersBrackets && (
        <Link
          href={`/bracket-settings/${bracketRecId}?bracketId=${bracketRecId}&leagueId=${leagueId}`}
          className={styles.button}
        >
          <p className={styles.text}>Settings</p>{' '}
          <FontAwesomeIcon icon={faGear} size="sm" />
        </Link>
      )}
    </div>
  );
}
