import { NextFunction, Request, Response } from 'express';
import { BadRequestException, NotAuthorized, NotFoundException } from '../errors';

export const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err) next();

  const customErrors = [BadRequestException, NotFoundException, NotAuthorized];

  let isCustomError = false;

  for (const customError of customErrors) {
    if (err instanceof customError) {
      isCustomError = true;
      break;
    }
  }

  res.status(isCustomError ? err.code : 500).json({
    code: 'error',
    message: isCustomError ? err.message : 'Internal server error',
  });
};
