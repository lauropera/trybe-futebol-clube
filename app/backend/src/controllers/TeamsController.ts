import { Request, Response } from 'express';
import { TeamsService } from '../services';
import { ITeamsController } from '../interfaces/ITeam';

class TeamsController implements ITeamsController {
  constructor(private _service: TeamsService) {
    this.listAllTeams = this.listAllTeams.bind(this);
    this.listTeamById = this.listTeamById.bind(this);
  }

  public async listAllTeams(_req: Request, res: Response): Promise<void> {
    const teams = await this._service.getAllTeams();
    res.status(200).json(teams);
  }

  public async listTeamById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const team = await this._service.getTeamById(Number(id));
    res.status(200).json(team);
  }
}

export default TeamsController;
