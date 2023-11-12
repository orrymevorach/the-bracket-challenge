import { client } from 'graphql/apollo-config';
import {
  UPDATE_USER_BRACKET,
  GET_SNOWBOARDERS,
  ADD_LEAGUE_ID,
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
  GET_LEAGUE_NAME,
} from 'graphql/queries';

export const getSnowboarders = async () => {
  try {
    const { data, loading } = await client.query({
      query: GET_SNOWBOARDERS,
    });
    return { snowboarders: data.snowboarders, isLoading: loading };
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
    const { members } = data.update_leagues[0];
    return {
      userTeamData: members[0],
    };
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

export const getLeagueName = async ({ id }) => {
  try {
    const { data } = await client.query({
      query: GET_LEAGUE_NAME,
      variables: {
        id,
      },
    });
    return data.leagues[0].name;
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

export const createBracket = async ({ name, memberId }) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_BRACKET,
      variables: {
        name,
        memberId,
      },
      awaitRefetchQueries: true,
    });
    const { memberId: allMemberIds } = data.insert_userBrackets[0];
    const userTeamData = allMemberIds.find(member => member.id === memberId);
    return {
      userTeamData,
    };
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
        R1_M1: rounds['R1_M1'],
        R1_M2: rounds['R1_M2'],
        R1_M3: rounds['R1_M3'],
        R1_M4: rounds['R1_M4'],
        R1_M5: rounds['R1_M5'],
        R1_M6: rounds['R1_M6'],
        R1_M7: rounds['R1_M7'],
        R1_M8: rounds['R1_M8'],
        R2_M1: rounds['R2_M1'],
        R2_M2: rounds['R2_M2'],
        R2_M3: rounds['R2_M3'],
        R2_M4: rounds['R2_M4'],
        R3_M1: rounds['R3_M1'],
        R3_M2: rounds['R3_M2'],
        R4_M1: rounds['R4_M1'],
        R5_M1: rounds['R5_M1'],
        id,
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
    });
    return data.winners[0];
  } catch (error) {
    console.log(error);
  }
};

export const getTeam = async ({ name }) => {
  try {
    const { data } = await client.query({
      query: GET_USER_TEAM,
      variables: {
        name,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
