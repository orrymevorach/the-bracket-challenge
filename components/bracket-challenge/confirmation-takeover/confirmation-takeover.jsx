import Takeover from '@/components/shared/Takeover/Takeover';
import styles from './confirmation-takeover.module.scss';
import { ROUTES } from '@/utils/constants';
import Button from '@/components/shared/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function ConfirmationTakeover({
  setShowConfirmationTakeover,
  leagueId,
}) {
  return (
    <Takeover
      handleClose={() => setShowConfirmationTakeover(false)}
      modalClassNames={styles.takeover}
    >
      <FontAwesomeIcon icon={faCheckCircle} color="#05bf78" size="xl" />
      <p className={styles.title}>Picks Submitted!</p>
      <p className={styles.message}>
        Check on your bracket every time a winner is announced to see how many
        points you earned!
      </p>
      <div className={styles.buttonsContainer}>
        <Button
          handleClick={() => setShowConfirmationTakeover(false)}
          classNames={styles.button}
        >
          Close
        </Button>
        <Button
          href={{
            pathname: `${ROUTES.LEAGUE}/${leagueId}`,
            query: {
              leagueId,
            },
          }}
        >
          Back to league page
        </Button>
      </div>
    </Takeover>
  );
}
