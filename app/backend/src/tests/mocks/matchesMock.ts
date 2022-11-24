import { INewMatch } from '../../interfaces';

interface MatchData {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

interface MatchInformations extends MatchData {
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}

export const matchesMock: MatchInformations[] = [
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
  }
];

export const newMatchResponseMock: MatchData = {
  id: 1,
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true,
};
