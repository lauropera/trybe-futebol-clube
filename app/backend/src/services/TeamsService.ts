import { ITeam, ITeamsService } from '../interfaces/ITeam';
import Team from '../database/models/Team';
import HttpException from '../utils/HttpException';

class TeamsService implements ITeamsService {
  private _repository = Team;

  public async getAllTeams(): Promise<ITeam[]> {
    const teams = await this._repository.findAll();
    return teams;
  }

  public async getTeamById(id: number): Promise<ITeam> {
    const team = await this._repository.findByPk(id);
    if (!team) throw new HttpException(404, 'Team not found');
    return team;
  }
}

export default TeamsService;
