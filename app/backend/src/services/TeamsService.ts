import HttpException from '../utils/HttpException';
import { ITeam, ITeamsService } from '../interfaces';
import TeamRepository from '../database/models/Team';

class TeamsService implements ITeamsService {
  private _model = TeamRepository;

  public async getAllTeams(): Promise<ITeam[]> {
    const teams = await this._model.findAll();
    return teams;
  }

  public async getTeamById(id: number): Promise<ITeam> {
    const team = await this._model.findByPk(id);
    if (!team) throw new HttpException(404, 'Team not found');
    return team;
  }
}

export default TeamsService;
