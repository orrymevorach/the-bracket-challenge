export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  BRACKET_CHALLENGE: '/bracket-challenge',
  LEAGUE: '/league',
  LEAGUE_SETTINGS: '/league-settings',
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
  Revelstoke: 'R_',
  Selkirk: 'S_',
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
