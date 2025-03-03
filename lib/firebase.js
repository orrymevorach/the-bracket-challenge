import { COOKIES, TABLES } from '@/utils/constants';
import Cookies from 'cookies';
import {
  getRecord,
  getUser,
  updateRecord,
  createRecord,
  db,
} from '@/lib/firebase-utils';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getSport } from './airtable';

export const createLeague = async ({ name, user, sport, openLeagueId }) => {
  // Create a bracket for the user
  const bracketResponse = await createBracket({
    name: user.username,
    memberId: user.id,
    sport,
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
        admin: user.id,
        json,
        sport,
        userBrackets: [bracketResponse.id],
      },
    });
    await updateRecord({
      tableId: TABLES.BRACKETS,
      recordId: bracketResponse.id,
      newFields: {
        leagueId: league.id,
      },
    });
    await updateRecord({
      tableId: TABLES.MEMBERS,
      recordId: user.uid,
      newFields: {
        leagues: user.leagues ? [...user.leagues, league.id] : [league.id],
        brackets: user.brackets
          ? [...user.brackets, bracketResponse.id]
          : [bracketResponse.id],
      },
    });

    await addBracketToOpenLeague({
      openLeagueId,
      bracketId: bracketResponse.id,
    });

    return league;
  } catch (error) {
    console.log(error);
  }
};

export const joinLeague = async ({ user, leagueId }) => {
  try {
    const league = await getLeague({ id: leagueId });
    if (!league) {
      return {
        error: `No league with ID ${leagueId} exists. Pleast try another League ID.`,
      };
    }
    const existingMembers = league?.members || [];

    // If user is already in league, return
    if (existingMembers.includes(user.id))
      return {
        error: null,
      };

    // Create a bracket for the user
    const bracketResponse = await createBracket({
      name: user.username,
      memberId: user.id,
      sport: league.sport,
      leagueId,
    });

    // Add user to league members
    const memberRecordIds = [...existingMembers, user.id];

    // Update user status in invitations
    const currentInvitations = league?.invitations || [];

    const updatedInvitations = currentInvitations.map(invitation => {
      if (invitation.email === user.emailAddress) {
        return {
          ...invitation,
          status: 'accepted',
        };
      }
      return invitation;
    });

    // Update league json
    let existingLeagueJson = league.json || [];
    const updatedLeagueJson = [
      ...existingLeagueJson,
      {
        bracketName: user.username,
        id: bracketResponse.id,
        selections: {},
      },
    ];

    // Add user bracket to league
    const existingBrackets = league.userBrackets || [];
    const updatedBrackets = [...existingBrackets, bracketResponse.id];

    // Add user to league
    await updateRecord({
      tableId: TABLES.LEAGUES,
      recordId: leagueId,
      newFields: {
        members: memberRecordIds,
        invitations: updatedInvitations,
        json: updatedLeagueJson,
        userBrackets: updatedBrackets,
      },
    });

    await updateRecord({
      tableId: TABLES.MEMBERS,
      recordId: user.uid,
      newFields: {
        leagues: user.leagues ? [...user.leagues, leagueId] : [leagueId],
        brackets: user.brackets
          ? [...user.brackets, bracketResponse.id]
          : [bracketResponse.id],
      },
    });

    const sportData = await getSport({
      sport: league.sport,
    });
    const openLeagueId = sportData.openLeagueId[0];
    await addBracketToOpenLeague({
      openLeagueId,
      bracketId: bracketResponse.id,
    });

    return { ...bracketResponse, error: null };
  } catch (err) {
    console.error(err);
  }
};

export const editBracketName = async ({ id, bracketName }) => {
  try {
    const bracket = await updateRecord({
      tableId: TABLES.BRACKETS,
      recordId: id,
      newFields: {
        name: bracketName,
      },
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

export const createBracket = async ({ name, memberId, sport, leagueId }) => {
  try {
    const bracket = await createRecord({
      tableId: TABLES.BRACKETS,
      newFields: {
        name,
        memberId: [memberId],
        sport,
        userName: name,
        leagueId: leagueId || '',
      },
    });
    return bracket;
  } catch (error) {
    console.log(error);
  }
};

export const getBracket = async ({ recId }) => {
  if (!recId) return;
  const bracket = await getRecord({
    tableId: TABLES.BRACKETS,
    recordId: recId,
  });
  return bracket;
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

export async function getSnowboardersBySport({ sport }) {
  const ref = collection(db, TABLES.SNOWBOARDERS);
  const q = query(ref, where('sport', '==', [sport]));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return []; // Return an empty array if no matches
    }

    let snowboarders = [];
    querySnapshot.docs.forEach(doc => {
      snowboarders.push(doc.data());
    });

    return snowboarders;
  } catch (error) {
    console.error('Error getting documents: ', error.message);
    throw error; // Throwing the error might help catch it elsewhere in the code
  }
}

export async function getLeaguesBySport({ sport }) {
  const ref = collection(db, TABLES.LEAGUES);
  const q = query(ref, where('sport', '==', sport));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return []; // Return an empty array if no matches
    }

    let leagues = [];
    querySnapshot.docs.forEach(doc => {
      leagues.push(doc.data());
    });

    return leagues;
  } catch (error) {
    console.error('Error getting documents: ', error.message);
    throw error; // Throwing the error might help catch it elsewhere in the code
  }
}

async function addBracketToOpenLeague({ openLeagueId, bracketId }) {
  const openLeagueData = await getLeague({ id: openLeagueId });
  const openLeagueBrackets = openLeagueData.userBrackets;
  let updatedOpenLeagueBrackets = [...openLeagueBrackets, bracketId];

  await updateRecord({
    tableId: TABLES.LEAGUES,
    recordId: openLeagueId,
    newFields: {
      userBrackets: updatedOpenLeagueBrackets,
    },
  });
}
