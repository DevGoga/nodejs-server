import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../database/models';
import { UnauthorizedException } from '../exceptions';
import { JwtService } from '../modules/users/jwt.service';

export const JwtGuard = (jwtService: JwtService) => async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    throw new UnauthorizedException();
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    throw new UnauthorizedException();
  }

  const isValid = jwtService.verify(token, 'access');

  if (!isValid) {
    throw new UnauthorizedException();
  }

  const payload = jwtService.decode(token);

  const user = await UserModel.findByPk(payload.id);

  if (!user) {
    throw new UnauthorizedException();
  }

  res.locals = {
    user: {
      id: user.id,
    },
  };

  next();
};
