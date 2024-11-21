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

  // Check if this bracket belongs to the current users, and if so show the settings button
  const currentUsersBrackets = user.leagues
    ? user.leagues.filter(league => {
        const isCurrentUsersBracket = league.userBrackets.find(bracket => {
          const memberId = bracket.memberId[0].id;
          if (memberId === user.id && bracketRecId === bracket.id) return true;
          return false;
        });
        if (isCurrentUsersBracket) return true;
        return false;
      })
    : [];

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
      {currentUsersBrackets.length && (
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
