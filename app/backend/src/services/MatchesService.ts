import { IMatchesService, IMatch } from '../interfaces';
import MatchRepository from '../database/models/Match';
import Team from '../database/models/Team';

class MatchesService implements IMatchesService {
  private _model = MatchRepository;

  public async getAllMatches(): Promise<IMatch[]> {
    const matches = await this._model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    }) as IMatch[];
    return matches;
  }
}

export default MatchesService;
