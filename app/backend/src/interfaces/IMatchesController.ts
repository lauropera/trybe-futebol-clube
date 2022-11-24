import { Request, Response } from 'express';

export default interface IMatchesController {
  listAllMatches(req: Request, res: Response): Promise<void>;
}
