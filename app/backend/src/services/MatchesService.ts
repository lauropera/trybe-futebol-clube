import HttpException from '../utils/HttpException';
import {
  IMatch,
  IMatchesService,
  IMatchFromDB,
  IMatchUpdate,
  INewMatch,
} from '../interfaces/IMatch';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { matchSchema } from './validations/schemas/schema';

const INCLUDE_OPTIONS = [
  { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
  { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
];

class MatchesService implements IMatchesService {
  private _repository = Match;
  private _teamRepository = Team;

  async getAll(): Promise<IMatchFromDB[]> {
    const matches = (await this._repository.findAll({
      include: INCLUDE_OPTIONS,
    })) as IMatchFromDB[];
    return matches;
  }

  async getByProgress(status: string): Promise<IMatchFromDB[]> {
    const inProgress = status === 'true';
    const matches = (await this._repository.findAll({
      include: INCLUDE_OPTIONS,
      where: { inProgress },
    })) as IMatchFromDB[];
    return matches;
  }

  private static validateMatchSchema(match: INewMatch): void {
    const { error } = matchSchema.validate(match);
    if (error) throw new HttpException(400, 'All fields must be filled');
  }

  private async validateMatchTeams({ homeTeam, awayTeam }: INewMatch) {
    if (homeTeam === awayTeam) {
      throw new HttpException(
        422,
        'It is not possible to create a match with two equal teams',
      );
    }

    const validHomeTeam = await this._teamRepository.findByPk(homeTeam);
    const validAwayTeam = await this._teamRepository.findByPk(awayTeam);
    if (!validHomeTeam || !validAwayTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }
  }

  async create(match: INewMatch): Promise<IMatch> {
    MatchesService.validateMatchSchema(match);
    await this.validateMatchTeams(match);

    const newMatch = await this._repository.create({
      ...match,
      inProgress: true,
    });
    return newMatch;
  }

  async finish(id: number): Promise<void> {
    const [result] = await this._repository.update(
      { inProgress: false },
      { where: { id } },
    );
    if (result !== 1) throw new HttpException(404, 'Update unsuccessful');
  }

  async update(values: IMatchUpdate, id: number): Promise<void> {
    const [result] = await this._repository.update(values, { where: { id } });
    if (result !== 1) throw new HttpException(404, 'Update unsuccessful');
  }
}

export default MatchesService;
