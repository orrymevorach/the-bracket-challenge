import {
  createRecord,
  getRecord,
  getRecordById,
  getRecords,
  updateRecord,
} from './airtable-utils';
import Cookies from 'cookies';

export const getSnowboarders = async () => {
  try {
    const { records: snowboarders } = await getRecords({
      tableId: 'Snowboarders',
      endpoint: '/get-snowboarders',
    });
    return { snowboarders };
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

export const createLeague = async ({ name, user }) => {
  const json = JSON.stringify([
    {
      name: `${user.firstName} ${user.lastName}`,
      username: user.username,
      id: user.id,
      selections: {},
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
      },
      endpoint: '/create-league',
    });
    // Create a bracket for the user
    await createBracket({
      name: user.username,
      memberId: user.id,
      leagueId: league.id,
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
        id: user.id,
        selections: {},
      },
    ];

    const stringifiedJson = JSON.stringify(updatedLeagueJson);

    // Add user to league
    const { record } = await updateRecord({
      tableId: 'Leagues',
      recordId: leagueId,
      newFields: {
        Members: memberRecordIds,
        Invitations: stringifiedInvitations,
        json: stringifiedJson,
      },
      endpoint: '/join-league',
    });

    // Create a bracket for the user
    await createBracket({
      name: user.username,
      memberId: user.id,
      leagueId,
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
  try {
    const { record: league } = await getRecordById({
      tableId: 'Leagues',
      recordId: id,
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

export const createBracket = async ({ name, memberId, leagueId }) => {
  try {
    const { record: bracket } = await createRecord({
      tableId: 'User Brackets',
      newFields: {
        Name: name,
        'Member ID': [memberId],
        'League Id': [leagueId],
      },
      endpoint: '/create-bracket',
    });
    return bracket;
  } catch (error) {
    console.log(error);
  }
};

const formatBracketData = bracket => {
  for (let key in bracket) {
    if (key.includes('_')) {
      const keyWithoutUnderscore = removeUnderscore(key);
      bracket[keyWithoutUnderscore] = bracket[key];
    }
  }
  console.log('bracket', bracket);
  return bracket;
};

export const getBracket = async ({ recId }) => {
  try {
    const { record: bracket } = await getRecordById({
      tableId: 'User Brackets',
      recordId: recId,
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

export const getUserLeagueData = async ({ uid }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENV_URL}//api/airtable/get-user-league-data`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid }),
    }
  ).then(res => res.json());
  return res.userLeagues;
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
