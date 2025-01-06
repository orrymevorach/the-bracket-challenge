import {
  createRecord,
  getRecord,
  getRecordById,
  getRecords,
  getRecordsByFieldValue,
  updateRecord,
} from './airtable-utils';
import Cookies from 'cookies';

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

export const getUser = async ({ uid }) => {
  try {
    const { record: user } = await getRecord({
      tableId: 'Members',
      field: 'UID',
      fieldValue: uid,
      endpoint: '/get-user-by-uid',
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async ({
  uid,
  firstName,
  lastName,
  username,
  email,
}) => {
  try {
    const { record } = await createRecord({
      tableId: 'Members',
      newFields: {
        UID: uid,
        'First Name': firstName,
        'Last Name': lastName,
        Username: username,
        'Email Address': email,
      },
      endpoint: '/create-user',
    });
    return record;
  } catch (error) {
    console.log(error);
  }
};

export const createLeague = async ({ name, user, sportRecId }) => {
  // Create a bracket for the user
  const bracketResponse = await createBracket({
    name: user.username,
    memberId: user.id,
  });

  const json = JSON.stringify([
    {
      name: `${user.firstName} ${user.lastName}`,
      username: user.username,
      id: bracketResponse.id,
      selections: {},
      userId: user.id,
    },
  ]);
  try {
    const { record: league } = await createRecord({
      tableId: 'Leagues',
      newFields: {
        Name: name,
        Members: [user.id],
        Admin: [user.id],
        Invitations: '[]',
        json,
        'Sport Ref': [sportRecId],
        'User Brackets': [bracketResponse.id],
      },
      endpoint: '/create-league',
    });

    // Update the league rankings data
    // await updateLeagueRankings({ leagueId: league.id });
    return league;
  } catch (error) {
    console.log(error);
  }
};

export const joinLeague = async ({ user, leagueId }) => {
  try {
    // Create a bracket for the user
    const bracketResponse = await createBracket({
      name: user.username,
      memberId: user.id,
    });

    const league = await getLeague({ id: leagueId });
    // Add user to league members
    const existingMembers = league?.members || [];
    const memberRecordIds = [...existingMembers, user.id];
    // Remove user from league invitations
    const currentInvitations = league?.invitations
      ? JSON.parse(league.invitations)
      : [];
    const updatedInvitations = currentInvitations.filter(
      invitation => invitation !== user.emailAddress
    );
    const stringifiedInvitations = updatedInvitations
      ? JSON.stringify(updatedInvitations)
      : null;

    // Update league json
    let existingLeagueJson = league.json ? JSON.parse(league.json) : [];
    const updatedLeagueJson = [
      ...existingLeagueJson,
      {
        name: `${user.firstName} ${user.lastName}`,
        username: user.username,
        userId: user.id,
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

    return record;
  } catch (err) {
    console.error(err);
  }
};

export const editLeagueName = async ({ id, leagueName }) => {
  try {
    const { record: league } = await updateRecord({
      tableId: 'Leagues',
      recordId: id,
      newFields: {
        Name: leagueName,
      },
      endpoint: '/edit-league-name',
    });
    return league;
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

export const getLeagueBrackets = async ({ id }) => {
  try {
    const { league } = await fetch(
      `${process.env.NEXT_PUBLIC_ENV_URL}/api/airtable/get-league-with-brackets`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leagueId: id }),
      }
    ).then(res => res.json());
    return league;
  } catch (error) {
    console.log(error);
  }
};

export const getLeague = async ({ id }) => {
  if (!id) return;
  try {
    const { record: league } = await getRecordById({
      tableId: 'Leagues',
      recordId: id,
      endpoint: '/get-league',
    });
    return league;
  } catch (error) {
    console.log(error);
  }
};

export const getLeagueMembers = async ({ id }) => {
  try {
    const { record: league } = await getRecordById({
      tableId: 'Leagues',
      recordId: id,
      endpoint: '/get-league',
    });
    const memberData = await Promise.all(
      league.members.map(async memberId => {
        const { record: member } = await getRecordById({
          tableId: 'Members',
          recordId: memberId,
          endpoint: '/get-user-by-id',
        });
        return member;
      })
    );

    return memberData;
  } catch (error) {
    console.log(error);
  }
};

export const createBracket = async ({ name, memberId }) => {
  try {
    const { record: bracket } = await createRecord({
      tableId: 'User Brackets',
      newFields: {
        Name: name,
        'Member ID': [memberId],
      },
      endpoint: '/create-bracket',
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

export const getWinners = async () => {
  try {
    const { record: winnersBracket } = await getRecord({
      tableId: 'User Brackets',
      field: 'Name',
      fieldValue: 'Master Winners Bracket',
      endpoint: '/get-winners-bracket',
    });
    for (let key in winnersBracket) {
      if (key.includes('_')) {
        const keyWithoutUnderscore = key.replace(/_/g, '');
        winnersBracket[keyWithoutUnderscore] = winnersBracket[key];
        delete winnersBracket[key];
      }
    }
    return winnersBracket;
  } catch (error) {
    console.log(error);
  }
};

export const getAllLeagues = async () => {
  try {
    const { records: leagues } = await getRecords({
      tableId: 'Leagues',
    });
    return leagues;
  } catch (error) {
    console.log(error);
  }
};

export const getInitialMatchups = async () => {
  const res = await fetch('/api/airtable/get-initial-matchups', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
  return res;
};

export const addUserSelectionsToRounds = async ({ matchups, bracket }) => {
  const res = await fetch('/api/airtable/add-user-selections-to-rounds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ matchups, bracket }),
  }).then(res => res.json());
  return res.matchups;
};

export const applyLiveResults = async ({ matchups, winners }) => {
  const res = await fetch('/api/airtable/apply-live-results', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ matchups, winners }),
  }).then(res => res.json());
  return res.matchups;
};

export const getAllBrackets = async () => {
  const { records: brackets } = await getRecords({
    tableId: 'User Brackets',
    endpoint: '/get-all-brackets',
  });
  return brackets;
};

export const getBracketName = async ({ id }) => {
  const bracket = await getBracket({ recId: id });
  return bracket.name;
};

export async function getPageLoadData({ req, res }) {
  const cookies = new Cookies(req, res);
  const uid = cookies.get('uid');
  if (!uid)
    return {
      user: null,
    };
  const user = await getUser({ uid });
  return {
    user,
  };
}

export async function getAllMembers() {
  const { records: members } = await getRecords({
    tableId: 'Members',
  });
  return members;
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
          if (matchup.round > 1) return recordId;
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
