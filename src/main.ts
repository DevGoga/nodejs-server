import { Container } from 'inversify';
import { Server } from './modules/server/server';
import { createServerModule } from './modules/server/server.module';
import { createTaskModule } from './modules/task/task.module';

const bootstrap = async () => {
  const app = Container.merge(createServerModule(), createTaskModule());

  const server = app.get<Server>(Server);
  await server.init();
};

bootstrap();
