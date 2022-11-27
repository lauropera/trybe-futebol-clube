export interface ITeamGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IHomeTeamMatches {
  name: string;
  homeTeamMatches: ITeamGoals[];
}

export interface IAwayTeamMatches {
  name: string;
  awayTeamMatches: ITeamGoals[];
}
