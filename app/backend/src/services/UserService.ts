import { compare } from 'bcryptjs';
import IUserService from '../interfaces/IUserService';
import HttpException from '../utils/HttpException';
import UserRepository from '../database/models/User';
import { ILogin } from '../interfaces';
import TokenUtils from '../utils/TokenUtils';

class UserService implements IUserService {
  private _model = UserRepository;

  constructor(private _tokenUtils = new TokenUtils()) {}

  public async login(credentials: ILogin): Promise<string> {
    if (!credentials.email || !credentials.password) {
      throw new HttpException(400, 'All fields must be filled');
    }

    const user = await this._model.findOne({ where: { email: credentials.email } });
    if (!user || !(await compare(credentials.password, user.password))) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const token = await this._tokenUtils.generate(user.id);
    return token;
  }

  public async getRole(id: number): Promise<string> {
    const user = await this._model.findOne({ where: { id } });
    if (!user) throw new HttpException(404, 'User not found');
    return user.role;
  }
}

export default UserService;
