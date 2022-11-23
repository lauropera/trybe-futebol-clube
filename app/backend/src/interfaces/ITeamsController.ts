import { Request, Response } from 'express';

export default interface ITeamsController {
  listAllTeams(req: Request, res: Response): Promise<void>;
  listTeamById(req: Request, res: Response): Promise<void>;
}
