import { Request, Response } from 'express';
import { TeamsService } from '../services';
import { ITeamsController } from '../interfaces';

class TeamsController implements ITeamsController {
  constructor(private _service: TeamsService) {
    this.listAllTeams = this.listAllTeams.bind(this);
  }

  public async listAllTeams(req: Request, res: Response): Promise<void> {
    const teams = await this._service.getAllTeams();
    res.status(200).json(teams);
  }
}

export default TeamsController;
