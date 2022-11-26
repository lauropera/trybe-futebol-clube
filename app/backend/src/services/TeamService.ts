import Team, { ITeam } from '../database/models/Team';
import HttpException from '../utils/HttpException';

class TeamService {
  private _model = Team;

  async getAllTeams(): Promise<ITeam[]> {
    const teams = await this._model.findAll();
    return teams;
  }

  async getTeamById(id: number): Promise<ITeam> {
    const team = await this._model.findByPk(id);
    if (!team) throw new HttpException(404, 'There is no team with such id!');
    return team;
  }
}

export default TeamService;
