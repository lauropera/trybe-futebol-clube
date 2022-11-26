import { compare } from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import User from '../database/models/User';
import Token from './utils/TokenUtils';
import HttpException from '../utils/HttpException';
import { loginSchema } from './utils/validations/schemas/schema';

class UserService {
  private _model = User;
  private _tokenUtils = Token;

  private static validateLoginSchema(credentials: ILogin): void {
    const { error } = loginSchema.validate(credentials);
    if (error) {
      const statusCode = error.message.includes('email') ? 401 : 400;
      throw new HttpException(statusCode, error.message);
    }
  }

  async login(credentials: ILogin): Promise<string> {
    UserService.validateLoginSchema(credentials);

    const user = await this._model.findOne({
      where: { email: credentials.email },
    });

    if (!user || !(await compare(credentials.password, user.password))) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const token = await this._tokenUtils.generate(user);
    return token;
  }

  async getRole(id: number): Promise<string> {
    const user = await this._model.findOne({ where: { id } });
    if (!user) throw new HttpException(404, 'User not found');
    return user.role;
  }
}

export default UserService;
