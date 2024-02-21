import RoundButtons from '../league/round-buttons/round-buttons';
import { useEffect, useState } from 'react';
import SetBracketName from './set-bracket-name/set-bracket-name';
import Loader from '../shared/loader/loader';
import styles from './bracket-challenge-container.module.scss';
import { useRouter } from 'next/router';
import { ROUNDS, ROUND_SUFFIXES } from '@/utils/constants';
import BracketChallenge from './bracket-challenge';
import { useConfig } from '@/context/config-context/config-context';
import MatchupsNotAvailable from './matchups-not-available/matchups-not-available';
import Layout from '../shared/layout/layout';
import { updateUserBracket } from '@/lib/airtable';
import Button from '../shared/button/button';
import { useMatchups } from '@/context/matchup-context/matchup-context';
import TopRow from './top-row/top-row';

const mapRoundNameToBracketConfig = {
  Duels: {
    numberOfColumns: 1,
    championRound: 2,
    display: 'regular',
  },
  DuelsWomen: {
    numberOfColumns: 1,
    championRound: 2,
    display: 'regular',
  },
  Revelstoke: {
    numberOfColumns: 3,
    championRound: 3,
    display: 'regular',
  },
  RevelstokeWomen: {
    numberOfColumns: 2,
    display: 'regular',
    championRound: 2,
  },
  Selkirk: {
    numberOfColumns: 4,
    display: 'regular',
    championRound: 3,
  },
  SelkirkWomen: {
    numberOfColumns: 2,
    display: 'regular',
    championRound: 2,
  },
};

export default function BracketChallengeContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentRound, setCurrentRound] = useState(ROUNDS[0]);
  const [isSettingName, setIsSettingName] = useState(true); // Reveals the set name modal
  const [isSubmitting, setIsSubmitting] = useState(false); // Handles load on the submit button
  const { matchups } = useMatchups();
  const currentRoundName = currentRound.name;

  const router = useRouter();
  const bracketRecId = router.query.bracketId;
  const leagueId = router.query.leagueId;

  const {
    config: { showMatchups, isSelectionsEnabled },
  } = useConfig();

  // User is required to give a bracket a name if no record ID exists for the bracket
  useEffect(() => {
    if (bracketRecId) {
      setIsSettingName(false);
    }
  }, [router, bracketRecId]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const rounds = Object.entries(matchups).reduce((acc, curr) => {
      const [roundName, roundMatchups] = curr;
      for (let matchup of roundMatchups) {
        const suffix = ROUND_SUFFIXES[roundName];
        const key = `${suffix}${matchup.matchupId}`;
        if (matchup.winner?.id) {
          acc[key] = matchup.winner.id;
        }
      }
      return acc;
    }, {});

    await updateUserBracket({ rounds, id: router.query.bracketId });
    router.reload();
  };

  return (
    <Layout
      backButtonText={leagueId ? 'Back to league page' : ''}
      backButtonHref={
        leagueId ? `/league/${leagueId}?leagueId=${leagueId}` : ''
      }
    >
      {isSettingName ? (
        <SetBracketName setIsSettingName={setIsSettingName} />
      ) : (
        <>
          <div className={styles.container}>
            <TopRow bracketRecId={bracketRecId} leagueId={leagueId} />
            <RoundButtons
              currentRound={currentRound}
              setCurrentRound={setCurrentRound}
              setIsLoading={setIsLoading}
            />
            {!isLoading && !showMatchups && <MatchupsNotAvailable />}
            {isLoading ? (
              <Loader classNames={styles.loader} />
            ) : (
              <>
                <BracketChallenge
                  currentRound={currentRoundName}
                  bracketConfig={mapRoundNameToBracketConfig[currentRoundName]}
                />
                <BracketChallenge
                  currentRound={`${currentRoundName}Women`}
                  bracketConfig={
                    mapRoundNameToBracketConfig[`${currentRoundName}Women`]
                  }
                />
                {isSelectionsEnabled && (
                  <Button
                    classNames={styles.submitButton}
                    handleClick={handleSubmit}
                    isLoading={isSubmitting}
                  >
                    Submit
                  </Button>
                )}
              </>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}
