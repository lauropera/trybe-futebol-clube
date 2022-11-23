import { Request, Response } from 'express';

export default interface ITeamController {
  listAllTeams(req: Request, res: Response): Promise<void>;
}
