import IGoals from './IGoals';

export interface ILeaderboard extends matchScores, IGoals {
  name: string;
  totalGames: number;
  efficiency: string;
}

export type matchGoals = {
  homeGoals: number;
  awayGoals: number;
};

export type matchScores = {
  totalPoints: number;
  totalVictories: number;
  totalLosses: number;
  totalDraws: number;
};
