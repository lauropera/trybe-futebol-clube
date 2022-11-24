import { IMatchesService, IMatchFromDB } from '../interfaces/IMatch';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

class MatchesService implements IMatchesService {
  private _repository = Match;

  public async getAllMatches(): Promise<IMatchFromDB[]> {
    const matches = (await this._repository.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    })) as IMatchFromDB[];
    return matches;
  }

  public async getMatchesByProgress(status: string): Promise<IMatchFromDB[]> {
    const inProgress = status === 'true';
    const matches = (await this._repository.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress },
    })) as IMatchFromDB[];
    return matches;
  }
}

export default MatchesService;
