import {
  IMatch,
  IMatchCreationAttrs,
  IMatchReturned,
  IMatchUpdate,
} from '../../database/models/Match';

export const matchesMock: IMatchReturned[] = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'São Paulo',
    },
    teamAway: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: {
      teamName: 'Internacional',
    },
    teamAway: {
      teamName: 'Santos',
    },
  },
];

export const newMatchMock: IMatchCreationAttrs = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export const invalidMatchesMock: IMatchCreationAttrs[] = [
  {
    homeTeam: 16,
    awayTeam: 16,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
  },
  {
    homeTeam: 999,
    awayTeam: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
  },
];

export const missingFieldsMock: Omit<IMatchCreationAttrs, 'homeTeam'> = {
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export const newMatchResponseMock: IMatch = {
  id: 1,
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true,
};

export const updateMatchMock: IMatchUpdate = {
  homeTeamGoals: 7,
  awayTeamGoals: 1,
};
