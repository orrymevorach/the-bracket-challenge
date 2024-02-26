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
          dR1M1 {
            name
          }
          dR1M2 {
            name
          }
          dR1M3 {
            name
          }
          dR1M4 {
            name
          }
          dR1M5 {
            name
          }
          dR1M6 {
            name
          }
          dR1M7 {
            name
          }
          dR1M8 {
            name
          }
          dwR1M1 {
            name
          }
          dwR1M2 {
            name
          }
          dwR1M3 {
            name
          }
          dwR1M4 {
            name
          }
          rR1M1 {
            name
          }
          rR1M2 {
            name
          }
          rR1M3 {
            name
          }
          rR1M4 {
            name
          }
          rR2M1 {
            name
          }
          rR2M2 {
            name
          }
          rR3M1 {
            name
          }
          rwR1M1 {
            name
          }
          rwR1M2 {
            name
          }
          rwR2M1 {
            name
          }
          sR1M1 {
            name
          }
          sR1M2 {
            name
          }
          sR1M3 {
            name
          }
          sR1M4 {
            name
          }
          sR2M1 {
            name
          }
          sR2M2 {
            name
          }
          sR3M1 {
            name
          }
          swR1M1 {
            name
          }
          swR1M2 {
            name
          }
          swR2M1 {
            name
          }
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
        dR1M1 {
          name
        }
        dR1M2 {
          name
        }
        dR1M3 {
          name
        }
        dR1M4 {
          name
        }
        dR1M5 {
          name
        }
        dR1M6 {
          name
        }
        dR1M7 {
          name
        }
        dR1M8 {
          name
        }
        dwR1M1 {
          name
        }
        dwR1M2 {
          name
        }
        dwR1M3 {
          name
        }
        dwR1M4 {
          name
        }
        rR1M1 {
          name
        }
        rR1M2 {
          name
        }
        rR1M3 {
          name
        }
        rR1M4 {
          name
        }
        rR2M1 {
          name
        }
        rR2M2 {
          name
        }
        rR3M1 {
          name
        }
        rwR1M1 {
          name
        }
        rwR1M2 {
          name
        }
        rwR2M1 {
          name
        }
        sR1M1 {
          name
        }
        sR1M2 {
          name
        }
        sR1M3 {
          name
        }
        sR1M4 {
          name
        }
        sR2M1 {
          name
        }
        sR2M2 {
          name
        }
        sR3M1 {
          name
        }
        swR1M1 {
          name
        }
        swR1M2 {
          name
        }
        swR2M1 {
          name
        }
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
      dR1M1 {
        id
        name
        flag
      }
      dR1M2 {
        id
        name
        flag
      }
      dR1M3 {
        id
        name
        flag
      }
      dR1M4 {
        id
        name
        flag
      }
      dR1M5 {
        id
        name
        flag
      }
      dR1M6 {
        id
        name
        flag
      }
      dR1M7 {
        id
        name
        flag
      }
      dR1M8 {
        id
        name
        flag
      }
      dwR1M1 {
        id
        name
        flag
      }
      dwR1M2 {
        id
        name
        flag
      }
      dwR1M3 {
        id
        name
        flag
      }
      dwR1M4 {
        id
        name
        flag
      }
      rR1M1 {
        id
        name
        flag
      }
      rR1M2 {
        id
        name
        flag
      }
      rR1M3 {
        id
        name
        flag
      }
      rR1M4 {
        id
        name
        flag
      }
      rR2M1 {
        id
        name
        flag
      }
      rR2M2 {
        id
        name
        flag
      }
      rR3M1 {
        id
        name
        flag
      }
      rwR1M1 {
        id
        name
        flag
      }
      rwR1M2 {
        id
        name
        flag
      }
      rwR2M1 {
        id
        name
        flag
      }
      sR1M1 {
        id
        name
        flag
      }
      sR1M2 {
        id
        name
        flag
      }
      sR1M3 {
        id
        name
        flag
      }
      sR1M4 {
        id
        name
        flag
      }
      sR2M1 {
        id
        name
        flag
      }
      sR2M2 {
        id
        name
        flag
      }
      sR3M1 {
        id
        name
        flag
      }
      swR1M1 {
        id
        name
        flag
      }
      swR1M2 {
        id
        name
        flag
      }
      swR2M1 {
        id
        name
        flag
      }
    }
  }
`;

export const UPDATE_USER_BRACKET = gql`
  mutation UPDATE_USER_BRACKET(
    $id: String
    $D_R1_M1: [String]
    $D_R1_M2: [String]
    $D_R1_M3: [String]
    $D_R1_M4: [String]
    $D_R1_M5: [String]
    $D_R1_M6: [String]
    $D_R1_M7: [String]
    $D_R1_M8: [String]
    $DW_R1_M1: [String]
    $DW_R1_M2: [String]
    $DW_R1_M3: [String]
    $DW_R1_M4: [String]
    $R_R1_M1: [String]
    $R_R1_M2: [String]
    $R_R1_M3: [String]
    $R_R1_M4: [String]
    $R_R2_M1: [String]
    $R_R2_M2: [String]
    $R_R3_M1: [String]
    $RW_R1_M1: [String]
    $RW_R1_M2: [String]
    $RW_R2_M1: [String]
    $S_R1_M1: [String]
    $S_R1_M2: [String]
    $S_R1_M3: [String]
    $S_R1_M4: [String]
    $S_R2_M1: [String]
    $S_R2_M2: [String]
    $S_R3_M1: [String]
    $SW_R1_M1: [String]
    $SW_R1_M2: [String]
    $SW_R2_M1: [String]
  ) {
    update_userBrackets(
      id: $id
      dR1M1: $D_R1_M1
      dR1M2: $D_R1_M2
      dR1M3: $D_R1_M3
      dR1M4: $D_R1_M4
      dR1M5: $D_R1_M5
      dR1M6: $D_R1_M6
      dR1M7: $D_R1_M7
      dR1M8: $D_R1_M8
      dwR1M1: $DW_R1_M1
      dwR1M2: $DW_R1_M2
      dwR1M3: $DW_R1_M3
      dwR1M4: $DW_R1_M4
      rR1M1: $R_R1_M1
      rR1M2: $R_R1_M2
      rR1M3: $R_R1_M3
      rR1M4: $R_R1_M4
      rR2M1: $R_R2_M1
      rR2M2: $R_R2_M2
      rR3M1: $R_R3_M1
      rwR1M1: $RW_R1_M1
      rwR1M2: $RW_R1_M2
      rwR2M1: $RW_R2_M1
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
      dR1M1 {
        name
        hometown
        flag
      }
      dR1M2 {
        name
        hometown
        flag
      }
      dR1M3 {
        name
        hometown
        flag
      }
      dR1M4 {
        name
        hometown
        flag
      }
      dR1M5 {
        name
        hometown
        flag
      }
      dR1M6 {
        name
        hometown
        flag
      }
      dR1M7 {
        name
        hometown
        flag
      }
      dR1M8 {
        name
        hometown
        flag
      }
      dwR1M1 {
        name
        hometown
        flag
      }
      dwR1M2 {
        name
        hometown
        flag
      }
      dwR1M3 {
        name
        hometown
        flag
      }
      dwR1M4 {
        name
        hometown
        flag
      }
      rR1M1 {
        name
        hometown
        flag
      }
      rR1M2 {
        name
        hometown
        flag
      }
      rR1M3 {
        name
        hometown
        flag
      }
      rR1M4 {
        name
        hometown
        flag
      }
      rR2M1 {
        name
        hometown
        flag
      }
      rR2M2 {
        name
        hometown
        flag
      }
      rR3M1 {
        name
        hometown
        flag
      }
      rwR1M1 {
        name
        hometown
        flag
      }
      rwR1M2 {
        name
        hometown
        flag
      }
      rwR2M1 {
        name
        hometown
        flag
      }
      sR1M1 {
        name
        hometown
        flag
      }
      sR1M2 {
        name
        hometown
        flag
      }
      sR1M3 {
        name
        hometown
        flag
      }
      sR1M4 {
        name
        hometown
        flag
      }
      sR2M1 {
        name
        hometown
        flag
      }
      sR2M2 {
        name
        hometown
        flag
      }
      sR3M1 {
        name
        hometown
        flag
      }
      swR1M1 {
        name
        hometown
        flag
      }
      swR1M2 {
        name
        hometown
        flag
      }
      swR2M1 {
        name
        hometown
        flag
      }
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
      dR1M1 {
        name
      }
      dR1M2 {
        name
      }
      dR1M3 {
        name
      }
      dR1M4 {
        name
      }
      dR1M5 {
        name
      }
      dR1M6 {
        name
      }
      dR1M7 {
        name
      }
      dR1M8 {
        name
      }
      dwR1M1 {
        name
      }
      dwR1M2 {
        name
      }
      dwR1M3 {
        name
      }
      dwR1M4 {
        name
      }
      rR1M1 {
        name
      }
      rR1M2 {
        name
      }
      rR1M3 {
        name
      }
      rR1M4 {
        name
      }
      rR2M1 {
        name
      }
      rR2M2 {
        name
      }
      rR3M1 {
        name
      }
      rwR1M1 {
        name
      }
      rwR1M2 {
        name
      }
      rwR2M1 {
        name
      }
      sR1M1 {
        name
      }
      sR1M2 {
        name
      }
      sR1M3 {
        name
      }
      sR1M4 {
        name
      }
      sR2M1 {
        name
      }
      sR2M2 {
        name
      }
      sR3M1 {
        name
      }
      swR1M1 {
        name
      }
      swR1M2 {
        name
      }
      swR2M1 {
        name
      }
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
