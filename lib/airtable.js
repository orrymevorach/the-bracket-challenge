import { COOKIES, TABLES } from '@/utils/constants';
import {
  getRecordById,
  getRecords,
  getRecordsByFieldValue,
} from './airtable-utils';

import Cookies from 'cookies';
import {
  getRecord,
  getUser,
  updateRecord,
  createRecord,
} from '@/components/LoginPage/firebase-utils';

export const getSnowboardersBySport = async ({ sport }) => {
  try {
    const { records: snowboarders } = await getRecordsByFieldValue({
      tableId: 'Snowboarders',
      formulaArray: [
        {
          fieldName: 'Sport',
          fieldValue: sport,
        },
      ],
      enableCache: true,
    });
    const removeUneededData = snowboarders.map(snowboarder => {
      return {
        ...snowboarder,
        matchups: null,
        matchups2: null,
        matchups3: null,
      };
    });
    return { snowboarders: removeUneededData };
  } catch (error) {
    console.log(error);
  }
};

export const createLeague = async ({ name, user, sport }) => {
  // Create a bracket for the user
  const bracketResponse = await createBracket({
    name: user.username,
    memberId: user.id,
  });

  const json = [
    {
      bracketName: user.username,
      id: bracketResponse.id,
      selections: {},
    },
  ];
  try {
    const league = await createRecord({
      tableId: TABLES.LEAGUES,
      newFields: {
        name,
        members: [user.id],
        admin: [user.id],
        json,
        sport,
        userBrackets: [bracketResponse.id],
      },
    });
    await updateRecord({
      tableId: TABLES.MEMBERS,
      recordId: user.uID,
      newFields: {
        leagues: [...user.leagues, league.id],
        brackets: [...user.brackets, bracketResponse.id],
      },
    });

    // Update the league rankings data
    // await updateLeagueRankings({ leagueId: league.id });
    return league;
  } catch (error) {
    console.log(error);
  }
};

export const joinPublicLeague = async ({ user, leagueId }) => {
  try {
    const league = await getLeague({ id: leagueId });
    const existingMembers = league?.members || [];

    // If user is already in league, return
    if (existingMembers.includes(user.id)) return;

    // Create a bracket for the user
    const bracketResponse = await createBracket({
      name: user.username,
      memberId: user.id,
    });

    // Add user to league members
    const memberRecordIds = [...existingMembers, user.id];

    // Add user bracket to league
    const existingBrackets = league.userBrackets || [];
    const updatedBrackets = [...existingBrackets, bracketResponse.id];

    // Add user to league
    const { record } = await updateRecord({
      tableId: 'Leagues',
      recordId: leagueId,
      newFields: {
        Members: memberRecordIds,
        'User Brackets': updatedBrackets,
      },
      endpoint: '/join-league',
    });

    return { league: record, bracket: bracketResponse };
  } catch (err) {
    console.error(err);
  }
};

export const joinLeague = async ({ user, leagueId }) => {
  try {
    const league = await getLeague({ id: leagueId });
    const existingMembers = league?.members || [];

    // If user is already in league, return
    if (existingMembers.includes(user.id)) return;

    // Create a bracket for the user
    const bracketResponse = await createBracket({
      name: user.username,
      memberId: user.id,
    });

    // Add user to league members
    const memberRecordIds = [...existingMembers, user.id];

    // Update user status in invitations
    const currentInvitations = league?.invitations
      ? JSON.parse(league.invitations)
      : [];

    const updatedInvitations = currentInvitations.map(invitation => {
      if (invitation.email === user.emailAddress) {
        return {
          ...invitation,
          status: 'accepted',
        };
      }
      return invitation;
    });

    const stringifiedInvitations = updatedInvitations
      ? JSON.stringify(updatedInvitations)
      : null;

    // Update league json
    let existingLeagueJson = league.json ? JSON.parse(league.json) : [];
    const updatedLeagueJson = [
      ...existingLeagueJson,
      {
        bracketName: user.username,
        id: bracketResponse.id,
        selections: {},
      },
    ];

    const stringifiedJson = JSON.stringify(updatedLeagueJson);

    // Add user bracket to league
    const existingBrackets = league.userBrackets || [];
    const updatedBrackets = [...existingBrackets, bracketResponse.id];

    // Add user to league
    const { record } = await updateRecord({
      tableId: 'Leagues',
      recordId: leagueId,
      newFields: {
        Members: memberRecordIds,
        Invitations: stringifiedInvitations,
        json: stringifiedJson,
        'User Brackets': updatedBrackets,
      },
      endpoint: '/join-league',
    });

    // Update the league rankings data
    // await updateLeagueRankings({ leagueId });

    return { league: record, bracket: bracketResponse };
  } catch (err) {
    console.error(err);
  }
};

export const editBracketName = async ({ id, bracketName }) => {
  try {
    const { record: bracket } = await updateRecord({
      tableId: 'User Brackets',
      recordId: id,
      newFields: {
        Name: bracketName,
      },
      endpoint: '/edit-bracket-name',
    });
    return bracket;
  } catch (err) {
    console.error(err);
  }
};

export const getLeague = async ({ id }) => {
  if (!id) return;
  try {
    const league = await getRecord({
      tableId: TABLES.LEAGUES,
      recordId: id,
    });
    return league;
  } catch (error) {
    console.log(error);
  }
};

export const createBracket = async ({ name, memberId }) => {
  try {
    const bracket = await createRecord({
      tableId: TABLES.BRACKETS,
      newFields: {
        name: name,
        memberID: [memberId],
      },
    });
    return bracket;
  } catch (error) {
    console.log(error);
  }
};

export const getBracket = async ({ recId }) => {
  if (!recId) return;
  try {
    const { record: bracket } = await getRecordById({
      tableId: 'User Brackets',
      recordId: recId,
      endpoint: '/get-bracket',
    });
    return bracket;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserBracket = async ({ rounds, id }) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export async function getPageLoadData({ req, res }) {
  const cookies = new Cookies(req, res);
  const uid = cookies.get(COOKIES.UID);
  if (!uid)
    return {
      user: null,
    };
  const user = await getUser({ uid });
  return {
    user,
  };
}

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
