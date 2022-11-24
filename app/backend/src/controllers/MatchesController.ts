import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import { IMatchesController } from '../interfaces';

class MatchesController implements IMatchesController {
  constructor(private _service: MatchesService) {
    this.listAllMatches = this.listAllMatches.bind(this);
  }

  public async listAllMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const matches = inProgress === undefined
      ? await this._service.getAllMatches()
      : await this._service.getMatchesByProgress(String(inProgress));
    res.status(200).json(matches);
  }
}

export default MatchesController;
