import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import { IMatchesController } from '../interfaces/IMatch';

class MatchesController implements IMatchesController {
  private _service: MatchesService;

  constructor() {
    this._service = new MatchesService();

    this.listAllMatches = this.listAllMatches.bind(this);
  }

  public async listAllMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const matches = inProgress === undefined
      ? await this._service.getAllMatches()
      : await this._service.getMatchesByProgress(String(inProgress));
    res.status(200).json(matches);
  }

  // public async createMatch(req: Request, res: Response): Promise<void> {
  //   const newMatch = await this._service.createNewMatch(req.body);
  //   res.status(201).json(newMatch);
  // }
}

export default MatchesController;
