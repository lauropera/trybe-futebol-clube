import IMatch from './IMatch';

export default interface IMatchesService {
  getAllMatches(): Promise<IMatch[]>;
  getMatchesByProgress(status: string): Promise<IMatch[]>;
}
