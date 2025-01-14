import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../exceptions';

export const AuthGuard = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user?.id) {
    throw new UnauthorizedException();
  }

  next();
};
