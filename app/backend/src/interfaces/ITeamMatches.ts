export type teamGoals = [
  {
    homeTeamGoals: number;
    awayTeamGoals: number;
  },
];

export interface IHomeTeamMatches {
  name: string;
  homeTeamMatches: teamGoals;
}

export interface IAwayTeamMatches {
  name: string;
  awayTeamMatches: teamGoals;
}
