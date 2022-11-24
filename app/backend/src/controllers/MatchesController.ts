import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../services/MatchesService';
import { IMatchesController } from '../interfaces/IMatch';

class MatchesController implements IMatchesController {
  private _service: MatchesService;

  constructor() {
    this._service = new MatchesService();

    this.listAll = this.listAll.bind(this);
    this.create = this.create.bind(this);
  }

  public async listAll(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const matches = inProgress === undefined
      ? await this._service.getAll()
      : await this._service.getByProgress(String(inProgress));
    res.status(StatusCodes.OK).json(matches);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const newMatch = await this._service.create(req.body);
    res.status(StatusCodes.CREATED).json(newMatch);
  }
}

export default MatchesController;
