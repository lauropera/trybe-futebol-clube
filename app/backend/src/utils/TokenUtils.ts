import { NextFunction } from 'express';
import * as jsonwebtokens from 'jsonwebtoken';

const SECRET = process.env.SECRET || 'jwt_secret';

class TokenUtils {
  constructor(private jwt = jsonwebtokens) {}

  public generate(id: number): string {
    return this.jwt.sign({ id }, SECRET, {
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
