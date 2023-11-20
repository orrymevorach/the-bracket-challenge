import styles from './bracket-challenge.module.scss';
import { useMatchups } from 'context/matchup-context/matchup-context';
import { split } from 'utils/utils';
import Loader from 'components/shared/loader/loader';
import Button from 'components/shared/button/button';
import { updateUserBracket } from '@/lib/airtable';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ROUND_SUFFIXES } from '@/utils/constants';
import GroupOfEightOneRound from './bracket-groups/group-of-eight-single-round';
import GroupOfEightMultiRound from './bracket-groups/group-of-eight-multi-round';
import GroupOfSixteenMultiRound from './bracket-groups/group-of-sixteen-multi-round';
import GroupOfSixteenSingleRound from './bracket-groups/group-of-sixteen-single-round';
import GroupOfFourMultiRound from './bracket-groups/group-of-four-multi-round';

const mapConfigToBracket = {
  eightSingle: GroupOfEightOneRound,
  eightMulti: GroupOfEightMultiRound,
  sixteenSingle: GroupOfSixteenSingleRound,
  sixteenMulti: GroupOfSixteenMultiRound,
  fourMulti: GroupOfFourMultiRound,
};

export default function BracketChallenge({
  currentRound,
  bracketConfig = 'sixteenSingle',
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { matchups } = useMatchups();
  const router = useRouter();

  const {
    roundOneMatchups = [],
    roundTwoMatchups = [],
    roundThreeMatchups = [],
    roundFourMatchup = [],
    winner,
  } = matchups;

  if (!matchups.roundOneMatchups.length) {
    return <Loader isDotted />;
  }

  const [firstHalfRoundOne, secondHalfRoundOne] = split(roundOneMatchups);
  const [firstHalfRoundTwo, secondHalfRoundTwo] = split(roundTwoMatchups);
  const [firstHalfRoundThree, secondHalfRoundThree] = split(roundThreeMatchups);
  const [firstHalfRoundFour, secondHalfRoundFour] = split(
    roundFourMatchup.length ? roundFourMatchup[0].snowboarders : []
  );
  // This can be cleaned up. RoundFour only has one matchup, and we need to show them on different sides
  const updatedFirstHalfRoundFour = [
    {
      matchupId: 'R4_M1',
      snowboarders: firstHalfRoundFour,
    },
  ];

  const updatedSecondHalfRoundFour = [
    {
      matchupId: 'R4_M1',
      snowboarders: secondHalfRoundFour,
    },
  ];
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const matchupsAsArray = Object.entries(matchups);
    const rounds = matchupsAsArray.reduce((acc, curr) => {
      const [_, roundMatchups] = curr;
      for (let matchup of roundMatchups) {
        const suffix = ROUND_SUFFIXES[currentRound];
        const key = `${suffix}${matchup.matchupId}`;
        if (matchup.winner?.id) {
          acc[key] = matchup.winner?.id;
        }
      }
      return acc;
    }, {});
    await updateUserBracket({ rounds, id: router.query.bracketId });
    setIsSubmitting(false);
  };

  const Component = mapConfigToBracket[bracketConfig];
  return (
    <div className={styles.bracketChallengeContainer}>
      <Button
        classNames={styles.submitButton}
        handleClick={() => handleSubmit()}
        isLoading={isSubmitting}
      >
        Submit
      </Button>
      <Component
        firstHalfRoundOne={firstHalfRoundOne}
        firstHalfRoundTwo={firstHalfRoundTwo}
        firstHalfRoundThree={firstHalfRoundThree}
        firstHalfRoundFour={firstHalfRoundFour}
        secondHalfRoundOne={secondHalfRoundOne}
        secondHalfRoundTwo={secondHalfRoundTwo}
        secondHalfRoundThree={secondHalfRoundThree}
        secondHalfRoundFour={secondHalfRoundFour}
        winner={winner}
        updatedFirstHalfRoundFour={updatedFirstHalfRoundFour}
        updatedSecondHalfRoundFour={updatedSecondHalfRoundFour}
      />
    </div>
  );
}
