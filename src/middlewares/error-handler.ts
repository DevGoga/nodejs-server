import { NextFunction, Response } from 'express';

export const ErrorHandler = (err: any, res: Response, next: NextFunction) => {
  if (!err) next();

  res.status(500).json({
    code: 'error',
    message: err.message,
  });
};
