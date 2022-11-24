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
  listAllMatches(req: Request, res: Response): Promise<void>;
  createMatch(req: Request, res: Response): Promise<void>;
}

export interface IMatchesService {
  getAllMatches(): Promise<IMatchFromDB[]>;
  getMatchesByProgress(status: string): Promise<IMatchFromDB[]>;
  createNewMatch(match: INewMatch): Promise<IMatch>;
}
