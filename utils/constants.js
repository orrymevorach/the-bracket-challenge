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
  CONTACT: '/contact',
  BRACKET_SETTINGS: '/bracket-settings',
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
    displayName: `Revelstoke Mountain${String.fromCharCode(160)}Resort`,
    name: REVELSTOKE,
  },
  {
    displayName: 'Selkirk Tangiers',
    name: SELKIRK,
  },
];

export const topDawgCompetitionLeagueId = 'recrKlmzDj22vkpf9';

export const CONTENT_MODELS = {
  LIST_MEDIA: 'listMedia',
};

export const COLORS = {
  GREEN: '#7bc9ab',
};
