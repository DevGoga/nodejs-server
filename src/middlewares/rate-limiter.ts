import dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';

const limit = 10000;
const range = 'minute';

const storage = {
  count: 0,
  lastTime: dayjs().startOf(range),
};

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const currentPeriod = dayjs().startOf(range);
  const lastRequestWasInCurrentPeriod = currentPeriod.isSame(storage.lastTime);

  storage.count++;

  res.setHeader('x-request-limit', limit);
  res.setHeader('x-request-used', storage.count);
  res.setHeader('x-request-remain', limit - storage.count);
  res.setHeader('x-request-next-period', currentPeriod.add(1, range).toISOString());

  if (lastRequestWasInCurrentPeriod && storage.count >= limit) {
    res.status(429).json('Too many requests!, please try again later');
  }

  if (!lastRequestWasInCurrentPeriod) {
    storage.count = 0;
  }

  storage.lastTime = dayjs().startOf(range);

  next();
};
