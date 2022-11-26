import { NextFunction } from 'express';
import * as jsonwebtokens from 'jsonwebtoken';
import { IUser } from '../database/models/User';

const SECRET = process.env.SECRET || 'jwt_secret';

class TokenUtils {
  constructor(private jwt = jsonwebtokens) {}

  public generate({ id, email }: IUser): string {
    return this.jwt.sign({ data: { id, email } }, SECRET, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });
  }

  public async authenticate(token: string, next: NextFunction) {
    try {
      const verify = await this.jwt.verify(token, SECRET);
      return verify;
    } catch (e) {
      return next({ status: 401, message: 'Token must be a valid token' });
    }
  }
}

export default TokenUtils;
