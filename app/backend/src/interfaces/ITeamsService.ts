import ITeam from './ITeam';

export default interface ITeamsService {
  getAllTeams(): Promise<ITeam[]>;
  getTeamById(id: number): Promise<ITeam>;
}
