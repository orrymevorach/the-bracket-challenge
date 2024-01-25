import { client } from 'graphql/apollo-config';
import {
  UPDATE_USER_BRACKET,
  GET_SNOWBOARDERS,
  CREATE_BRACKET,
  CREATE_LEAGUE,
  CREATE_USER,
  GET_LEAGUE_BRACKETS,
  GET_USER,
  JOIN_LEAGUE,
  GET_BRACKET,
  GET_WINNERS,
  GET_USER_TEAM,
  GET_LEAGUE_MEMBERS,
  GET_LEAGUE_CONFIG,
  EDIT_LEAGUE_NAME,
  GET_LEAGUE_IDS,
  GET_CURRENT_USER_BRACKETS,
} from 'graphql/queries';

export const getSnowboarders = async () => {
  try {
    const { data, loading } = await client.query({
      query: GET_SNOWBOARDERS,
    });

    const snowboarders = data.snowboarders;
    return { snowboarders, isLoading: loading };
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async ({ uid }) => {
  try {
    const { data } = await client.query({
      query: GET_USER,
      variables: {
        uid,
      },
    });
    return { ...data.members[0] };
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async ({ uid, name, email }) => {
  try {
    const { data, loading } = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        uid,
        name,
        email,
      },
    });
    return {
      userTeamData: data.insert_members[0],
    };
  } catch (error) {
    console.log(error);
  }
};

export const createLeague = async ({ name, memberRecordId }) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_LEAGUE,
      variables: {
        name,
        memberRecordId,
      },
    });
    return data.insert_leagues[0];
  } catch (error) {
    console.log(error);
  }
};

export const joinLeague = async ({ id, memberRecordIds }) => {
  try {
    const { data } = await client.mutate({
      mutation: JOIN_LEAGUE,
      variables: {
        id,
        memberRecordIds,
      },
    });
    return data.update_leagues[0];
  } catch (err) {
    console.error(err);
  }
};

export const editLeagueName = async ({ id, leagueName }) => {
  try {
    const { data } = await client.mutate({
      mutation: EDIT_LEAGUE_NAME,
      variables: {
        id,
        leagueName,
      },
    });
    return data.update_leagues[0];
  } catch (err) {
    console.error(err);
  }
};

export const getLeagueBrackets = async ({ id }) => {
  try {
    const { data } = await client.query({
      query: GET_LEAGUE_BRACKETS,
      variables: {
        id,
      },
    });
    return data.leagues[0];
  } catch (error) {
    console.log(error);
  }
};

export const getLeagueConfig = async ({ id }) => {
  try {
    const { data } = await client.query({
      query: GET_LEAGUE_CONFIG,
      variables: {
        id,
      },
    });
    return data.leagues[0];
  } catch (error) {
    console.log(error);
  }
};

export const getLeagueMembers = async ({ id }) => {
  try {
    const { data } = await client.query({
      query: GET_LEAGUE_MEMBERS,
      variables: {
        id,
      },
    });
    return data.leagues[0].members;
  } catch (error) {
    console.log(error);
  }
};

export const createBracket = async ({ name, memberId, leagueId }) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_BRACKET,
      variables: {
        name,
        memberId,
        leagueId,
      },
    });
    return data.insert_userBrackets[0];
  } catch (error) {
    console.log(error);
  }
};

export const getBracket = async ({ recId }) => {
  try {
    const { data } = await client.query({
      query: GET_BRACKET,
      variables: {
        recId,
      },
    });
    return data.userBrackets[0];
  } catch (error) {
    console.log(error);
  }
};

export const updateUserBracket = async ({ rounds, id }) => {
  try {
    await client.mutate({
      mutation: UPDATE_USER_BRACKET,
      variables: {
        id,
        D_R1_M1: rounds['D_R1_M1'],
        D_R1_M2: rounds['D_R1_M2'],
        D_R1_M3: rounds['D_R1_M3'],
        D_R1_M4: rounds['D_R1_M4'],
        D_R1_M5: rounds['D_R1_M5'],
        D_R1_M6: rounds['D_R1_M6'],
        D_R1_M7: rounds['D_R1_M7'],
        D_R1_M8: rounds['D_R1_M8'],
        DW_R1_M1: rounds['DW_R1_M1'],
        DW_R1_M2: rounds['DW_R1_M2'],
        DW_R1_M3: rounds['DW_R1_M3'],
        DW_R1_M4: rounds['DW_R1_M4'],
        R_R1_M1: rounds['R_R1_M1'],
        R_R1_M2: rounds['R_R1_M2'],
        R_R1_M3: rounds['R_R1_M3'],
        R_R1_M4: rounds['R_R1_M4'],
        R_R2_M1: rounds['R_R2_M1'],
        R_R2_M2: rounds['R_R2_M2'],
        R_R3_M1: rounds['R_R3_M1'],
        RW_R1_M1: rounds['RW_R1_M1'],
        RW_R1_M2: rounds['RW_R1_M2'],
        RW_R2_M1: rounds['RW_R2_M1'],
        S_R1_M1: rounds['S_R1_M1'],
        S_R1_M2: rounds['S_R1_M2'],
        S_R1_M3: rounds['S_R1_M3'],
        S_R1_M4: rounds['S_R1_M4'],
        S_R2_M1: rounds['S_R2_M1'],
        S_R2_M2: rounds['S_R2_M2'],
        S_R3_M1: rounds['S_R3_M1'],
        SW_R1_M1: rounds['SW_R1_M1'],
        SW_R1_M2: rounds['SW_R1_M2'],
        SW_R2_M1: rounds['SW_R2_M1'],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getWinners = async () => {
  try {
    const { data } = await client.query({
      query: GET_WINNERS,
      variables: {
        name: 'Master Winners Bracket',
      },
    });
    return data.userBrackets[0];
  } catch (error) {
    console.log(error);
  }
};

export const getLeagueIds = async () => {
  try {
    const { data } = await client.query({
      query: GET_LEAGUE_IDS,
    });
    return data.leagues;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUserBrackets = async ({ id }) => {
  try {
    const { data } = await client.query({
      query: GET_CURRENT_USER_BRACKETS,
      variables: {
        id,
      },
    });
    return data.members[0].brackets;
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
  return res.firstRoundMatchups;
};

export const addUserSelectionsToRounds = async ({
  matchups,
  bracketId,
  currentRound,
}) => {
  const res = await fetch('/api/airtable/add-user-selections-to-rounds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ matchups, bracketId, currentRound }),
  }).then(res => res.json());
  return res.matchups;
};

export const applyLiveResults = async ({ matchups, currentRound }) => {
  const res = await fetch('/api/airtable/apply-live-results', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ matchups, currentRound }),
  }).then(res => res.json());
  return res.matchups;
};

export const getUserLeagueData = async ({ uid }) => {
  const res = await fetch('/api/airtable/get-user-league-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid }),
  }).then(res => res.json());
  return res.userLeagues;
};
