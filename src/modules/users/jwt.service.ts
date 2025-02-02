import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { appConfig } from '../../config';
import { UserModel } from '../../database/models';
import { TokenPair } from './jwt.types';

@injectable()
export class JwtService {
  makeTokenPair(id: UserModel['id']): TokenPair {
    const payload = { id };

    const accessToken = jwt.sign(payload, appConfig.authToken, { expiresIn: '1h' });

    const refreshToken = jwt.sign(payload, appConfig.refreshToken, { expiresIn: '1w' });

    return { accessToken, refreshToken };
  }
}
