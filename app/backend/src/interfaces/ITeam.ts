import { Request, Response } from 'express';

export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamsController {
  listAllTeams(req: Request, res: Response): Promise<void>;
  listTeamById(req: Request, res: Response): Promise<void>;
}

export interface ITeamsService {
  getAllTeams(): Promise<ITeam[]>;
  getTeamById(id: number): Promise<ITeam>;
}
