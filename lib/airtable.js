import {
  getRecordById,
  getRecords,
  getRecordsByFieldValue,
} from './airtable-utils';

export async function getContestsBySport({ sport }) {
  const { records: contests } = await getRecordsByFieldValue({
    tableId: 'Contests',
    formulaArray: [
      {
        fieldName: 'Sport',
        fieldValue: sport,
      },
    ],
  });
  return contests;
}

export async function populateContestsWithSelectedWinnersAndMatchups(
  contests,
  snowboarders
) {
  const snowboardersAsMap = snowboarders.reduce((acc, snowboarder) => {
    acc[snowboarder.id] = snowboarder;
    return acc;
  }, {});

  const contestsWithMatchups = await Promise.all(
    contests.map(async contest => {
      const matchups = contest.matchups || [];
      if (!matchups.length) return contest;
      const matchupsData = await Promise.all(
        matchups.map(async recordId => {
          const { record: matchup } = await getRecordById({
            tableId: 'Matchups',
            recordId: recordId,
          });
          // Only return data for the first round, minimize size of data going to the client on page load
          if (matchup.round > 1)
            return { id: matchup.id, matchupId: matchup.matchupId };
          const team1 = snowboardersAsMap[matchup.team1];
          const team2 = snowboardersAsMap[matchup.team2];
          return {
            ...matchup,
            team1,
            team2,
          };
        })
      );
      return {
        ...contest,
        matchups: matchupsData,
      };
    })
  );
  return contestsWithMatchups;
}

export async function getSports() {
  const { records: sports } = await getRecords({ tableId: 'Sports' });
  // We dont need this data on the website, and it increase the bundle size
  const removeLeagues = sports.map(sport => {
    return {
      ...sport,
      leagues: null,
    };
  });
  return removeLeagues;
}

export async function getMatchupsBySport({ sport }) {
  const { records: matchups } = await getRecordsByFieldValue({
    tableId: 'Matchups',
    formulaArray: [
      {
        fieldName: 'Sport',
        fieldValue: sport,
      },
    ],
  });

  return matchups;
}

export async function getQuestions({ recIds, snowboarders }) {
  const mapRecIdToSnowboarder = snowboarders.reduce((acc, snowboarder) => {
    acc[snowboarder.id] = snowboarder;
    return acc;
  }, {});
  const questions = await Promise.all(
    recIds.map(async recId => {
      const { record: question } = await getRecordById({
        tableId: 'Questions',
        recordId: recId,
      });
      const options = question.optionsRef.map(snowboarderRef => {
        const snowboarder = mapRecIdToSnowboarder[snowboarderRef];

        if (!snowboarder)
          return {
            name: snowboarderRef,
            image: null,
          };
        return {
          name: snowboarder?.name,
          image: snowboarder?.image,
        };
      });

      question.options = options;
      return question;
    })
  );
  return questions;
}
