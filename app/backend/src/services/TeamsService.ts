import { ITeam, ITeamsService } from '../interfaces';
import TeamRepository from '../database/models/Team';

class TeamsService implements ITeamsService {
  private _model = TeamRepository;

  public async getAllTeams(): Promise<ITeam[]> {
    const teams = await this._model.findAll();
    return teams;
  }
}

export default TeamsService;
