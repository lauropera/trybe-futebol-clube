export interface ILeaderboard extends matchScores {
  name: string;
  totalGames: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
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
