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
      recordId: user.uID,
      newFields: {
        leagues: [...user.leagues, leagueId],
        brackets: [...user.brackets, bracketResponse.id],
      },
    });

    // Update the league rankings data
    // await updateLeagueRankings({ leagueId });

    return;
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
