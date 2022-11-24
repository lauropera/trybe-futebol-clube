import { Request, Response } from 'express';
import Match from '../database/models/Match';

export interface IMatch extends INewMatch {
  id: number;
  inProgress: boolean;
}

export interface INewMatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatchInformations extends IMatch {
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}

export interface IMatchFromDB extends IMatchInformations, Match {}

export interface IMatchesController {
  listAll(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  finish(req: Request, res: Response): Promise<void>;
}

export interface IMatchesService {
  getAll(): Promise<IMatchFromDB[]>;
  getByProgress(status: string): Promise<IMatchFromDB[]>;
  create(match: INewMatch): Promise<IMatch>;
  finish(id: number): Promise<void>;
}
