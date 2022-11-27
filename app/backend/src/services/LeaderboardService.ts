import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IGoals from '../interfaces/IGoals';
import {
  ILeaderboard,
  matchGoals,
  matchScores,
} from '../interfaces/ILeaderboard';
import {
  IHomeTeamMatches,
  IAwayTeamMatches,
  ITeamGoals,
} from '../interfaces/ITeamMatches';

class LeaderboardService {
  private _teamModel = Team;

  private static isHomeTeam(team: string): boolean {
    return team === 'homeTeam';
  }

  private async getMatchesData(
    team: string,
  ): Promise<IHomeTeamMatches[] | IAwayTeamMatches[]> {
    const opponent = LeaderboardService.isHomeTeam(team)
      ? 'awayTeam'
      : 'homeTeam';

    const dbMatches = await this._teamModel.findAll({
      include: [
        {
          model: Match,
          as: `${team}Matches`,
          attributes: [`${team}Goals`, `${opponent}Goals`],
          where: { inProgress: false },
        },
      ],
      attributes: [['team_name', 'name']],
    });
    const matches = dbMatches.map((match) => match.get({ plain: true }));
    return matches;
  }

  private static sumGoals(teamMatches: ITeamGoals[]): matchGoals {
    const homeGoals = teamMatches.reduce(
      (acc, curr) => acc + curr.homeTeamGoals,
      0,
    );
    const awayGoals = teamMatches.reduce(
      (acc, curr) => acc + curr.awayTeamGoals,
      0,
    );
    return { homeGoals, awayGoals };
  }

  private static homeTeamPoints(matches: ITeamGoals[]): number {
    return matches.reduce(
      (acc, curr) => (curr.homeTeamGoals > curr.awayTeamGoals ? acc + 1 : acc),
      0,
    );
  }

  private static awayTeamPoints(matches: ITeamGoals[]): number {
    return matches.reduce(
      (acc, curr) => (curr.awayTeamGoals > curr.homeTeamGoals ? acc + 1 : acc),
      0,
    );
  }

  private static drawPoints(matches: ITeamGoals[]): number {
    return matches.reduce(
      (acc, curr) =>
        (curr.awayTeamGoals === curr.homeTeamGoals ? acc + 1 : acc),
      0,
    );
  }

  private static gamePoints(team: string, matches: ITeamGoals[]): matchScores {
    const totalVictories = LeaderboardService.isHomeTeam(team)
      ? LeaderboardService.homeTeamPoints(matches)
      : LeaderboardService.awayTeamPoints(matches);

    const totalLosses = LeaderboardService.isHomeTeam(team)
      ? LeaderboardService.awayTeamPoints(matches)
      : LeaderboardService.homeTeamPoints(matches);

    const totalDraws = LeaderboardService.drawPoints(matches);
    const totalPoints = totalVictories * 3 + totalDraws;

    return { totalPoints, totalVictories, totalLosses, totalDraws };
  }

  private static sortLeaderboard(leaderboard: ILeaderboard[]): ILeaderboard[] {
    return leaderboard.sort(
      (a, b) =>
        b.totalPoints - a.totalPoints
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || a.goalsOwn - b.goalsOwn,
    );
  }

  private static gameGoals(team: string, goals: matchGoals): IGoals {
    const goalsFavor = LeaderboardService.isHomeTeam(team)
      ? goals.homeGoals
      : goals.awayGoals;

    const goalsOwn = LeaderboardService.isHomeTeam(team)
      ? goals.awayGoals
      : goals.homeGoals;

    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  }

  private static setLeaderboard(
    team: string,
    name: string,
    matches: ITeamGoals[],
  ) {
    const goals = LeaderboardService.sumGoals(matches);
    const points = LeaderboardService.gamePoints(team, matches);
    const totalGames = matches.length;
    return {
      name,
      totalGames,
      ...points,
      ...LeaderboardService.gameGoals(team, goals),
      efficiency: ((points.totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
  }

  async getHomeTeamsLeaderboard(): Promise<ILeaderboard[]> {
    const homeMatches = (await this.getMatchesData(
      'homeTeam',
    )) as IHomeTeamMatches[];

    const leaderboard = homeMatches.map(({ name, homeTeamMatches }) =>
      LeaderboardService.setLeaderboard('homeTeam', name, homeTeamMatches));

    return LeaderboardService.sortLeaderboard(leaderboard);
  }

  async getAwayTeamsLeaderboard(): Promise<ILeaderboard[]> {
    const awayMatches = (await this.getMatchesData(
      'awayTeam',
    )) as IAwayTeamMatches[];

    const leaderboard = awayMatches.map(({ name, awayTeamMatches }) =>
      LeaderboardService.setLeaderboard('awayTeam', name, awayTeamMatches));

    return LeaderboardService.sortLeaderboard(leaderboard);
  }

  private static setFullLeaderboard(teamData: ILeaderboard[]) {
    const totalPoints = teamData[0].totalPoints + teamData[1].totalPoints;
    const totalGames = teamData[0].totalGames + teamData[1].totalGames;
    return {
      name: teamData[0].name,
      totalPoints,
      totalGames,
      totalVictories: teamData[0].totalVictories + teamData[1].totalVictories,
      totalDraws: teamData[0].totalDraws + teamData[1].totalDraws,
      totalLosses: teamData[0].totalLosses + teamData[1].totalLosses,
      goalsFavor: teamData[0].goalsFavor + teamData[1].goalsFavor,
      goalsOwn: teamData[0].goalsOwn + teamData[1].goalsOwn,
      goalsBalance: teamData[0].goalsBalance + teamData[1].goalsBalance,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
  }

  async getLeaderboard(): Promise<ILeaderboard[]> {
    const homeTeamsLeaderboard = await this.getHomeTeamsLeaderboard();
    const awayTeamsLeaderboard = await this.getAwayTeamsLeaderboard();
    const fullLeaderboard = homeTeamsLeaderboard.concat(awayTeamsLeaderboard);
    const leaderboard = [] as ILeaderboard[];

    homeTeamsLeaderboard.forEach((team) => {
      const teamData = fullLeaderboard.filter(({ name }) => team.name === name);
      leaderboard.push(LeaderboardService.setFullLeaderboard(teamData));
    });

    return LeaderboardService.sortLeaderboard(leaderboard);
  }
}

export default LeaderboardService;
