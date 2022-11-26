import {
  IMatch,
  INewMatch,
  IMatchInformations,
  IMatchScore,
} from '../../interfaces/IMatch';

export const matchesMock: IMatchInformations[] = [
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

export const newMatchMock: INewMatch = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export const invalidMatchesMock: INewMatch[] = [
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

export const missingFieldsMock: Omit<INewMatch, 'homeTeam'> = {
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

export const updateMatchMock: IMatchScore = {
  homeTeamGoals: 7,
  awayTeamGoals: 1,
};
