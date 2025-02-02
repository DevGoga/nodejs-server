import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { appConfig } from '../../config';
import { UserModel } from '../../database/models';
import { BadRequestException } from '../../exceptions';
import { TokenPair } from './jwt.types';

@injectable()
export class JwtService {
  makeTokenPair(id: UserModel['id']): TokenPair {
    const payload = { id };

    const accessToken = jwt.sign(payload, appConfig.authToken, { expiresIn: '1h' });

    const refreshToken = jwt.sign(payload, appConfig.refreshToken, { expiresIn: '1w' });

    return { accessToken, refreshToken };
  }

  verify(token: string, type: 'access' | 'refresh'): boolean {
    let result = false;

    const secret = type === 'access' ? appConfig.authToken : appConfig.refreshToken;

    jwt.verify(token, secret, (err) => {
      result = !err;
    });

    return result;
  }

  decode(token: string) {
    const decoded = jwt.decode(token, { json: true });

    if (!decoded) {
      throw new BadRequestException('Invalid decoded');
    }

    return decoded;
  }
}
