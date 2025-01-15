import 'reflect-metadata';
import 'express-async-errors';
import { Container } from 'inversify';
import { Server } from './modules/server/server';
import { createServerModule } from './modules/server/server.modules';
import { createTaskModule } from './modules/task/task.module';
import { createUserModule } from './modules/users/user.module';

const bootstrap = async () => {
  const app = Container.merge(createServerModule(), createTaskModule(), createUserModule());

  const server = app.get<Server>(Server);

  await server.init();
};

bootstrap();
