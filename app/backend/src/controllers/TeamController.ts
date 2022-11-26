import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TeamService } from '../services';

class TeamController {
  private _service: TeamService;

  constructor() {
    this._service = new TeamService();

    this.listAllTeams = this.listAllTeams.bind(this);
    this.listTeamById = this.listTeamById.bind(this);
  }

  async listAllTeams(_req: Request, res: Response): Promise<void> {
    const teams = await this._service.getAllTeams();
    res.status(StatusCodes.OK).json(teams);
  }

  async listTeamById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const team = await this._service.getTeamById(Number(id));
    res.status(StatusCodes.OK).json(team);
  }
}

export default TeamController;
