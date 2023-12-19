export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  BRACKET_CHALLENGE: '/bracket-challenge',
  LEAGUE: '/league',
  LEAGUE_SETTINGS: '/league-settings',
  COMING_SOON: '/coming-soon',
  PAGE_NOT_FOUND: '/404',
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
};
