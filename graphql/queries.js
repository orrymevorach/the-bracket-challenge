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

const USER_FRAGMENT = gql`
  fragment UserFields on members {
    id
    name
    leagues {
      id
      name
    }
    brackets {
      id
      name
      leagueName
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
  mutation CreateUser($uid: String, $name: String, $email: String) {
    insert_members(uid: $uid, name: $name, emailAddress: $email) {
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
      brackets {
        userName
        r1M1 {
          name
        }
        r1M2 {
          name
        }
        r1M3 {
          name
        }
        r1M4 {
          name
        }
        r1M5 {
          name
        }
        r1M6 {
          name
        }
        r1M7 {
          name
        }
        r1M8 {
          name
        }
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
  query GetBracket($recId: String) {
    userBrackets(id: $recId) {
      r1M1 {
        name
        id
        matchupId
        country
      }
      r1M2 {
        name
        id
        matchupId
        country
      }
      r1M3 {
        name
        id
        matchupId
        country
      }
      r1M4 {
        name
        id
        matchupId
        country
      }
      r1M5 {
        name
        id
        matchupId
        country
      }
      r1M6 {
        name
        id
        matchupId
        country
      }
      r1M7 {
        name
        id
        matchupId
        country
      }
      r1M8 {
        name
        id
        matchupId
        country
      }
      r2M1 {
        name
        id
        matchupId
        country
      }
      r2M2 {
        name
        id
        matchupId
        country
      }
      r2M3 {
        name
        id
        matchupId
        country
      }
      r2M4 {
        name
        id
        matchupId
        country
      }
      r3M1 {
        name
        id
        matchupId
        country
      }
      r3M2 {
        name
        id
        matchupId
        country
      }
      r4M1 {
        name
        id
        matchupId
        country
      }
      r5M1 {
        name
        id
        matchupId
        country
      }
    }
  }
`;

export const UPDATE_USER_BRACKET = gql`
  mutation UPDATE_USER_BRACKET(
    $id: String
    $R1_M1: [String]
    $R1_M2: [String]
    $R1_M3: [String]
    $R1_M4: [String]
    $R1_M5: [String]
    $R1_M6: [String]
    $R1_M7: [String]
    $R1_M8: [String]
    $R2_M1: [String]
    $R2_M2: [String]
    $R2_M3: [String]
    $R2_M4: [String]
    $R3_M1: [String]
    $R3_M2: [String]
    $R4_M1: [String]
    $R5_M1: [String]
  ) {
    update_userBrackets(
      id: $id
      r1M1: $R1_M1
      r1M2: $R1_M2
      r1M3: $R1_M3
      r1M4: $R1_M4
      r1M5: $R1_M5
      r1M6: $R1_M6
      r1M7: $R1_M7
      r1M8: $R1_M8
      r2M1: $R2_M1
      r2M2: $R2_M2
      r2M3: $R2_M3
      r2M4: $R2_M4
      r3M1: $R3_M1
      r3M2: $R3_M2
      r4M1: $R4_M1
      r5M1: $R5_M1
    ) {
      id
    }
  }
`;

// export const UPDATE_USER_BRACKET = gql`
//   mutation UPDATE_USER_BRACKET(
//     $id: String
//     $roundOneWinners: [String]
//     $quarterFinalWinners: [String]
//     $semiFinalWinners: [String]
//     $winner: [String]
//   ) {
//     update_userBrackets(
//       id: $id
//       roundOneWinners: $roundOneWinners
//       quarterFinalWinners: $quarterFinalWinners
//       semiFinalWinners: $semiFinalWinners
//       winner: $winner
//     ) {
//       id
//     }
//   }
// `;

export const GET_WINNERS = gql`
  query GetWinners($name: String) {
    winners(name: $name) {
      r1M1 {
        name
        id
        matchupId
        country
      }
      r1M2 {
        name
        id
        matchupId
        country
      }
      r1M3 {
        name
        id
        matchupId
        country
      }
      r1M4 {
        name
        id
        matchupId
        country
      }
      r1M5 {
        name
        id
        matchupId
        country
      }
      r1M6 {
        name
        id
        matchupId
        country
      }
      r1M7 {
        name
        id
        matchupId
        country
      }
      r1M8 {
        name
        id
        matchupId
        country
      }
      r2M1 {
        name
        id
        matchupId
        country
      }
      r2M2 {
        name
        id
        matchupId
        country
      }
      r2M3 {
        name
        id
        matchupId
        country
      }
      r2M4 {
        name
        id
        matchupId
        country
      }
      r3M1 {
        name
        id
        matchupId
        country
      }
      r3M2 {
        name
        id
        matchupId
        country
      }
      r4M1 {
        name
        id
        matchupId
        country
      }
      r5M1 {
        name
        id
        matchupId
        country
      }
    }
  }
`;
