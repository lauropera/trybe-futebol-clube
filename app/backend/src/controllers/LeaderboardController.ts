import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { LeaderboardService } from '../services';

class LeaderboardController {
  private _service: LeaderboardService;

  constructor() {
    this._service = new LeaderboardService();

    this.listHomeTeams = this.listHomeTeams.bind(this);
    this.listAwayTeams = this.listAwayTeams.bind(this);
    this.getFullLeaderboard = this.getFullLeaderboard.bind(this);
  }

  async listHomeTeams(_req: Request, res: Response): Promise<void> {
    const teams = await this._service.getHomeTeamsLeaderboard();
    res.status(StatusCodes.OK).json(teams);
  }

  async listAwayTeams(_req: Request, res: Response): Promise<void> {
    const teams = await this._service.getAwayTeamsLeaderboard();
    res.status(StatusCodes.OK).json(teams);
  }

  async getFullLeaderboard(_req: Request, res: Response): Promise<void> {
    const teams = await this._service.getLeaderboard();
    res.status(StatusCodes.OK).json(teams);
  }
}

export default LeaderboardController;
