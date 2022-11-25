import { Request, Response } from 'express';
import Match from '../database/models/Match';

export interface IMatch extends INewMatch {
  id: number;
  inProgress: boolean;
}

export interface IMatchUpdate {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface INewMatch extends IMatchUpdate {
  homeTeam: number;
  awayTeam: number;
}

export interface IMatchInformations extends IMatch {
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}

export interface IMatchFromDB extends IMatchInformations, Match {}

export interface IMatchController {
  listAll(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  finish(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
}

export interface IMatchService {
  getAll(): Promise<IMatchFromDB[]>;
  getByProgress(status: string): Promise<IMatchFromDB[]>;
  create(match: INewMatch): Promise<IMatch>;
  finish(id: number): Promise<void>;
  update(values: IMatchUpdate, id: number): Promise<void>;
}
