import styles from './bracket-settings.module.scss';
import LeaguePageLayout from '../LeaguePage/league-page-layout/league-page-layout';
import { useLeagueConfig } from '@/context/league-config-context/league-config-context';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from '../shared/Button/Button';
import EditBracketNameTakeover from './edit-bracket-name-takeover/edit-bracket-name-takeover';
import { ROUTES } from '@/utils/constants';
import { useRouter } from 'next/router';

export default function BracketSettings() {
  const { bracketData } = useLeagueConfig();
  const router = useRouter();
  const leagueId = router.query.leagueId;
  const bracketId = router.query.bracketId;

  const [showEditLeagueNameTakeover, setShowEditLeagueNameTakeover] =
    useState(false);

  return (
    <LeaguePageLayout
      title="Bracket Settings:"
      backButtonHref={`${ROUTES.BRACKET_CHALLENGE}?leagueId=${leagueId}&bracketId=${bracketId}`}
      titleName={bracketData?.name}
    >
      <div>
        {showEditLeagueNameTakeover && (
          <EditBracketNameTakeover
            setShowTakeover={setShowEditLeagueNameTakeover}
            classNames={styles.takeover}
            bracketId={bracketId}
            leagueId={leagueId}
          />
        )}
        <div className={styles.container}>
          <p className={styles.title}>Bracket Name</p>
          <Button
            isSmall
            handleClick={() => setShowEditLeagueNameTakeover(true)}
            classNames={styles.editButton}
            isYellow
          >
            <FontAwesomeIcon icon={faEdit} color="white" />
          </Button>
        </div>
        <p className={styles.name}>{bracketData?.name}</p>
      </div>
    </LeaguePageLayout>
  );
}
