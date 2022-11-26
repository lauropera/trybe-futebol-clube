import HttpException from '../utils/HttpException';
import Match, {
  IMatch,
  IMatchUpdate,
  IMatchCreationAttrs,
} from '../database/models/Match';
import Team from '../database/models/Team';
import { matchSchema } from './validations/schemas/schema';

const INCLUDE_OPTIONS = [
  { model: Team, as: 'teamHome', attributes: ['teamName'] },
  { model: Team, as: 'teamAway', attributes: ['teamName'] },
];

class MatchService {
  private _model = Match;
  private _teamModel = Team;

  async getAll(): Promise<IMatch[]> {
    const matches = await this._model.findAll({
      include: INCLUDE_OPTIONS,
    });
    return matches;
  }

  async getByProgress(status: string): Promise<IMatch[]> {
    const inProgress = status === 'true';
    const matches = await this._model.findAll({
      include: INCLUDE_OPTIONS,
      where: { inProgress },
    });
    return matches;
  }

  private static validateMatchSchema(match: IMatchCreationAttrs): void {
    const { error } = matchSchema.validate(match);
    if (error) throw new HttpException(400, 'All fields must be filled');
  }

  private async validateMatchTeams({
    homeTeam,
    awayTeam,
  }: IMatchCreationAttrs) {
    if (homeTeam === awayTeam) {
      throw new HttpException(
        422,
        'It is not possible to create a match with two equal teams',
      );
    }

    const validHomeTeam = await this._teamModel.findByPk(homeTeam);
    const validAwayTeam = await this._teamModel.findByPk(awayTeam);
    if (!validHomeTeam || !validAwayTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }
  }

  async create(match: IMatchCreationAttrs): Promise<IMatch> {
    MatchService.validateMatchSchema(match);
    await this.validateMatchTeams(match);

    const newMatch = await this._model.create({
      ...match,
      inProgress: true,
    });
    return newMatch;
  }

  async finish(id: number): Promise<void> {
    const [result] = await this._model.update(
      { inProgress: false },
      { where: { id } },
    );
    if (result !== 1) throw new HttpException(404, 'Update unsuccessful');
  }

  async update(values: IMatchUpdate, id: number): Promise<void> {
    const [result] = await this._model.update(values, { where: { id } });
    if (result !== 1) throw new HttpException(404, 'Update unsuccessful');
  }
}

export default MatchService;
