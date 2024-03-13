import { gql } from '@apollo/client';

export const GET_SNOWBOARDERS = gql`
  query GetSnowboarders {
    snowboarders {
      id
      name
      description
      image
      flag
      instagram
      duelsMatchupId
      revelstokeMatchupId
      selkirkMatchupId
      hometown
      mountain
      stance
      sponsors
    }
  }
`;

export const GET_USER = gql`
  query GetUser($uid: String) {
    members(uid: $uid) {
      id
      name
      leagues {
        id
        name
        userBrackets {
          id
          name
          userName
          memberId {
            id
          }
        }
      }
    }
  }
`;

export const GET_USER_WITH_PICKS = gql`
  query GetUser($uid: String) {
    members(uid: $uid) {
      id
      name
      leagues {
        id
        name
        userBrackets {
          id
          name
          userName
          memberId {
            id
          }
          dR1M1
          dR1M2
          dR1M3
          dR1M4
          dwR1M1
          dwR1M2
          rR1M1
          rR1M2
          rR1M3
          rR1M4
          rR1M5
          rR1M6
          rR1M7
          rR1M8
          rwR1M1
          rwR1M2
          rwR1M3
          rwR1M4
          sR1M1
          sR1M2
          sR1M3
          sR1M4
          sR2M1
          sR2M2
          sR3M1
          swR1M1
          swR1M2
          swR2M1
        }
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($uid: String, $name: String, $email: String) {
    insert_members(uid: $uid, name: $name, emailAddress: $email) {
      id
    }
  }
`;

export const CREATE_LEAGUE = gql`
  mutation CreateLeague($name: String, $memberRecordId: String) {
    insert_leagues(
      name: $name
      members: [$memberRecordId]
      admin: [$memberRecordId]
    ) {
      id
    }
  }
`;

export const JOIN_LEAGUE = gql`
  mutation JoinLeague($id: String, $memberRecordIds: [String]) {
    update_leagues(id: $id, members: $memberRecordIds) {
      id
    }
  }
`;

export const GET_LEAGUE_BRACKETS = gql`
  query GetLeagueBrackets($id: String) {
    leagues(id: $id) {
      userBrackets {
        id
        name
        userName
        memberId {
          id
        }
        dR1M1
        dR1M2
        dR1M3
        dR1M4
        dwR1M1
        dwR1M2
        rR1M1
        rR1M2
        rR1M3
        rR1M4
        rR1M5
        rR1M6
        rR1M7
        rR1M8
        rwR1M1
        rwR1M2
        rwR1M3
        rwR1M4
        sR1M1
        sR1M2
        sR1M3
        sR1M4
        sR2M1
        sR2M2
        sR3M1
        swR1M1
        swR1M2
        swR2M1
      }
    }
  }
`;

export const GET_LEAGUE_CONFIG = gql`
  query GetLeagueConfig($id: String) {
    leagues(id: $id) {
      id
      name
      admin {
        id
      }
    }
  }
`;

export const GET_LEAGUE_MEMBERS = gql`
  query GetLeagueMembers($id: String) {
    leagues(id: $id) {
      members {
        id
        name
      }
    }
  }
`;

export const CREATE_BRACKET = gql`
  mutation CreateBracket($name: String, $memberId: String, $leagueId: String) {
    insert_userBrackets(
      name: $name
      memberId: [$memberId]
      leagueId: [$leagueId]
    ) {
      id
    }
  }
`;

export const GET_BRACKET = gql`
  query GetBracket($recId: String) {
    userBrackets(id: $recId) {
      id
      dR1M1
      dR1M2
      dR1M3
      dR1M4
      dwR1M1
      dwR1M2
      rR1M1
      rR1M2
      rR1M3
      rR1M4
      rR1M5
      rR1M6
      rR1M7
      rR1M8

      rwR1M1
      rwR1M2
      rwR1M3
      rwR1M4
      sR1M1
      sR1M2
      sR1M3
      sR1M4
      sR2M1
      sR2M2
      sR3M1
      swR1M1
      swR1M2
      swR2M1
    }
  }
`;

// Temporary hot patch fix
export const GET_BRACKET_PICKS = gql`
  query GetBracketPicks($recId: String) {
    userBrackets(id: $recId) {
      id
      dR1M1
      dR1M2
      dR1M3
      dR1M4
      dwR1M1
      dwR1M2
      rR1M1
      rR1M2
      rR1M3
      rR1M4
      rR1M5
      rR1M6
      rR1M7
      rR1M8
      rwR1M1
      rwR1M2
      rwR1M3
      rwR1M4
    }
  }
`;

export const UPDATE_USER_BRACKET = gql`
  mutation UPDATE_USER_BRACKET(
    $id: String
    $D_R1_M1: String
    $D_R1_M2: String
    $D_R1_M3: String
    $D_R1_M4: String
    $DW_R1_M1: String
    $DW_R1_M2: String
    $R_R1_M1: String
    $R_R1_M2: String
    $R_R1_M3: String
    $R_R1_M4: String
    $R_R1_M5: String
    $R_R1_M6: String
    $R_R1_M7: String
    $R_R1_M8: String
    $RW_R1_M1: String
    $RW_R1_M2: String
    $RW_R1_M3: String
    $RW_R1_M4: String
    $S_R1_M1: String
    $S_R1_M2: String
    $S_R1_M3: String
    $S_R1_M4: String
    $S_R2_M1: String
    $S_R2_M2: String
    $S_R3_M1: String
    $SW_R1_M1: String
    $SW_R1_M2: String
    $SW_R2_M1: String
  ) {
    update_userBrackets(
      id: $id
      dR1M1: $D_R1_M1
      dR1M2: $D_R1_M2
      dR1M3: $D_R1_M3
      dR1M4: $D_R1_M4
      dwR1M1: $DW_R1_M1
      dwR1M2: $DW_R1_M2
      rR1M1: $R_R1_M1
      rR1M2: $R_R1_M2
      rR1M3: $R_R1_M3
      rR1M4: $R_R1_M4
      rR1M5: $R_R1_M5
      rR1M6: $R_R1_M6
      rR1M7: $R_R1_M7
      rR1M8: $R_R1_M8
      rwR1M1: $RW_R1_M1
      rwR1M2: $RW_R1_M2
      rwR1M3: $RW_R1_M3
      rwR1M4: $RW_R1_M4
      sR1M1: $S_R1_M1
      sR1M2: $S_R1_M2
      sR1M3: $S_R1_M3
      sR1M4: $S_R1_M4
      sR2M1: $S_R2_M1
      sR2M2: $S_R2_M2
      sR3M1: $S_R3_M1
      swR1M1: $SW_R1_M1
      swR1M2: $SW_R1_M2
      swR2M1: $SW_R2_M1
    ) {
      id
    }
  }
`;

export const GET_WINNERS = gql`
  query GetWinners($name: String) {
    userBrackets(name: $name) {
      dR1M1
      dR1M2
      dR1M3
      dR1M4
      dwR1M1
      dwR1M2
      rR1M1
      rR1M2
      rR1M3
      rR1M4
      rR1M5
      rR1M6
      rR1M7
      rR1M8
      rwR1M1
      rwR1M2
      rwR1M3
      rwR1M4
      sR1M1
      sR1M2
      sR1M3
      sR1M4
      sR2M1
      sR2M2
      sR3M1
      swR1M1
      swR1M2
      swR2M1
    }
  }
`;

export const EDIT_LEAGUE_NAME = gql`
  mutation EditLeagueName($id: String, $leagueName: String) {
    update_leagues(id: $id, name: $leagueName) {
      id
    }
  }
`;

export const EDIT_BRACKET_NAME = gql`
  mutation EditBracketName($id: String, $bracketName: String) {
    update_userBrackets(id: $id, name: $bracketName) {
      id
    }
  }
`;

export const GET_LEAGUE_IDS = gql`
  query GetLeagueIds {
    leagues {
      id
    }
  }
`;

export const GET_CURRENT_USER_BRACKETS = gql`
  query getCurrentUserBrackets($id: String) {
    members(id: $id) {
      brackets {
        id
      }
    }
  }
`;

export const GET_ALL_BRACKETS = gql`
  query GetAllBrackets {
    userBrackets {
      name
      id
      memberId {
        id
      }
      dR1M1
      dR1M2
      dR1M3
      dR1M4
      dwR1M1
      dwR1M2
      rR1M1
      rR1M2
      rR1M3
      rR1M4
      rR1M5
      rR1M6
      rR1M7
      rR1M8
      rwR1M1
      rwR1M2
      rwR1M3
      rwR1M4
      sR1M1
      sR1M2
      sR1M3
      sR1M4
      sR2M1
      sR2M2
      sR3M1
      swR1M1
      swR1M2
      swR2M1
    }
  }
`;

export const GET_BRACKET_NAME = gql`
  query GetAllBrackets($id: String) {
    userBrackets(id: $id) {
      name
    }
  }
`;

export const GET_ALL_MEMBERS_WITH_LEAGUE_DATA = gql`
  query getAllMembersWithLeagueData {
    members {
      name
      emailAddress
      leagues {
        id
        name
      }
      brackets {
        name
      }
      adminLeagues {
        name
      }
    }
  }
`;
