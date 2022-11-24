import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import { IMatchesController } from '../interfaces';

class MatchesController implements IMatchesController {
  constructor(private _service: MatchesService) {
    this.listAllMatches = this.listAllMatches.bind(this);
  }

  public async listAllMatches(_req: Request, res: Response): Promise<void> {
    const matches = await this._service.getAllMatches();
    res.status(200).json(matches);
  }
}

export default MatchesController;
