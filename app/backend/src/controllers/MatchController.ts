import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchService from '../services/MatchService';

class MatchController {
  private _service: MatchService;

  constructor() {
    this._service = new MatchService();

    this.listAll = this.listAll.bind(this);
    this.create = this.create.bind(this);
    this.finish = this.finish.bind(this);
    this.update = this.update.bind(this);
  }

  async listAll(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const matches = inProgress === undefined
      ? await this._service.getAll()
      : await this._service.getByProgress(String(inProgress));
    res.status(StatusCodes.OK).json(matches);
  }

  async create(req: Request, res: Response): Promise<void> {
    const newMatch = await this._service.create(req.body);
    res.status(StatusCodes.CREATED).json(newMatch);
  }

  async finish(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this._service.finish(Number(id));
    res.status(StatusCodes.OK).json({ message: 'Finished' });
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this._service.update(req.body, Number(id));
    res.status(StatusCodes.OK).json({ message: 'Successfully updated!' });
  }
}

export default MatchController;
