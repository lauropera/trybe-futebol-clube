import { ITeam, ITeamService } from '../interfaces/ITeam';
import Team from '../database/models/Team';
import HttpException from '../utils/HttpException';

class TeamService implements ITeamService {
  private _repository = Team;

  async getAllTeams(): Promise<ITeam[]> {
    const teams = await this._repository.findAll();
    return teams;
  }

  async getTeamById(id: number): Promise<ITeam> {
    const team = await this._repository.findByPk(id);
    if (!team) throw new HttpException(404, 'There is no team with such id!');
    return team;
  }
}

export default TeamService;
