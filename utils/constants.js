export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  BRACKET_CHALLENGE: '/bracket-challenge',
  LEAGUE: '/league',
  LEAGUE_SETTINGS: '/league-settings',
  COMING_SOON: '/coming-soon',
  PAGE_NOT_FOUND: '/404',
  CREATE_BRACKET: '/create-bracket',
};

export const COOKIES = {
  UID: 'uid',
};

export const ROUND_NAMES = {
  DUELS: 'Duels',
  REVELSTOKE: 'Revelstoke',
  SELKIRK: 'Selkirk',
};

export const ROUND_SUFFIXES = {
  Duels: 'D_',
  DuelsWomen: 'DW_',
  Revelstoke: 'R_',
  RevelstokeWomen: 'RW_',
  Selkirk: 'S_',
  SelkirkWomen: 'SW_',
};

const { DUELS, REVELSTOKE, SELKIRK } = ROUND_NAMES;
export const ROUNDS = [
  {
    displayName: 'NST Duels',
    name: DUELS,
  },
  {
    displayName: 'Revelstoke Mountain Resort',
    name: REVELSTOKE,
  },
  {
    displayName: 'Selkirk Tangiers',
    name: SELKIRK,
  },
];

export const FEATURE_FLAGS = {
  SHOW_COMING_SOON_PAGE: 'SHOW_COMING_SOON_PAGE',
  IS_DUELS_SELECTIONS_ENABLED: 'IS_DUELS_SELECTIONS_ENABLED',
  IS_REVELSTOKE_SELECTIONS_ENABLED: 'IS_REVELSTOKE_SELECTIONS_ENABLED',
  IS_SELKIRK_SELECTIONS_ENABLED: 'IS_SELKIRK_SELECTIONS_ENABLED',
  SHOW_DUELS_MATCHUPS: 'SHOW_DUELS_MATCHUPS',
  SHOW_REVELSTOKE_MATCHUPS: 'SHOW_REVELSTOKE_MATCHUPS',
  SHOW_SELKIRK_MATCHUPS: 'SHOW_SELKIRK_MATCHUPS',
};
