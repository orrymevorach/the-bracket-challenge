import { gql } from '@apollo/client';

export const GET_SNOWBOARDERS = gql`
  query GetSnowboarders {
    snowboarders {
      name
      id
      matchupId
      country
    }
  }
`;

export const GET_USER_TEAM = gql`
  query GetUserTeam($name: String) {
    userTeams(name: $name) {
      name
      quarterFinalMatchups {
        name
        matchupId
        id
      }
      semiFinalMatchups {
        name
        matchupId
        id
      }
      finalsMatchup {
        name
        matchupId
        id
      }
      winner {
        name
        matchupId
        id
      }
    }
  }
`;

export const UPDATE_USER_BRACKET = gql`
  mutation UPDATE_USER_BRACKET(
    $id: String
    $roundOneWinners: [String]
    $quarterFinalWinners: [String]
    $semiFinalWinners: [String]
    $winner: [String]
  ) {
    update_userBrackets(
      id: $id
      roundOneWinners: $roundOneWinners
      quarterFinalWinners: $quarterFinalWinners
      semiFinalWinners: $semiFinalWinners
      winner: $winner
    ) {
      id
    }
  }
`;

const USER_FRAGMENT = gql`
  fragment UserFields on members {
    id
    leagues {
      id
      name
    }
    brackets {
      id
      name
    }
  }
`;
export const GET_USER = gql`
  query GetUser($uid: String) {
    members(uid: $uid) {
      ...UserFields
    }
  }
  ${USER_FRAGMENT}
`;

export const CREATE_USER = gql`
  mutation CreateUser($uid: String, $name: String) {
    insert_members(uid: $uid, name: $name) {
      ...UserFields
    }
  }
  ${USER_FRAGMENT}
`;

export const CREATE_LEAGUE = gql`
  mutation CreateLeague(
    $name: String
    $adminUid: String
    $adminAirtableRecordId: String
  ) {
    insert_leagues(
      name: $name
      adminUid: $adminUid
      members: [$adminAirtableRecordId]
    ) {
      id
      members {
        ...UserFields
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const ADD_LEAGUE_ID = gql`
  mutation AddLeagueId($leagueId: String, $id: String) {
    update_leagues(id: $id, leagueId: $leagueId) {
      id
    }
  }
`;

export const JOIN_LEAGUE = gql`
  mutation AddLeagueId($id: String, $memberRecordId: String) {
    update_leagues(id: $id, members: [$memberRecordId]) {
      id
      members {
        ...UserFields
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_LEAGUE = gql`
  query GetLeague($name: String) {
    leagues(name: $name) {
      members {
        uid
        name
      }
    }
  }
`;

export const CREATE_BRACKET = gql`
  mutation CreateBracket($name: String, $memberId: String) {
    insert_userBrackets(name: $name, memberId: [$memberId]) {
      id
      memberId {
        ...UserFields
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_BRACKET = gql`
  query GetBracket($name: String, $memberId: String) {
    insert_userBrackets(name: $name, memberId: [$memberId]) {
      id
      memberId {
        ...UserFields
      }
    }
  }
  ${USER_FRAGMENT}
`;
