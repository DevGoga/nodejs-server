import { NextFunction, Request, Response } from 'express';
import { NotAuthorized } from '../errors';

export const AuthGuard = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user?.id) {
    throw new NotAuthorized();
  }

  next();
};
