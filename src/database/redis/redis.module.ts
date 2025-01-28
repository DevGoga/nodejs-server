import { Container } from 'inversify';
import { RedisService } from './redis.service';

export const createRedisModule = () => {
  const container = new Container();

  container.bind(RedisService).toSelf().inSingletonScope();

  return container;
};
