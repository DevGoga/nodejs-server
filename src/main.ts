import { Container } from 'inversify';
import { createRedisModule } from './database/redis/redis.module';
import { RedisService } from './database/redis/redis.service';
import { Server } from './modules/server/server';
import { createServerModule } from './modules/server/server.module';
import { createTaskModule } from './modules/task/task.module';

const bootstrap = async () => {
  const app = Container.merge(createServerModule(), createTaskModule(), createRedisModule());

  const server = app.get<Server>(Server);
  await server.init();

  const redis = app.get<RedisService>(RedisService);
  await redis.connect();
};

bootstrap();
