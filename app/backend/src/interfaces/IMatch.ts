export interface IMatch extends INewMatch {
  id: number;
  inProgress: boolean;
}

export interface IMatchScore {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface INewMatch extends IMatchScore {
  homeTeam: number;
  awayTeam: number;
}

export interface IMatchInformations extends IMatch {
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}
