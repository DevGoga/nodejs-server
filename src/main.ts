import 'reflect-metadata';
import 'express-async-errors';
import express, { Request } from 'express';
import { logRoutes } from './bootstrap';
import { appConfig } from './config';
import { connectPostgres } from './database';
import { NotFoundException } from './exception';
import { ErrorHandler, logRequestMiddleware, privateRoutes, rateLimiter, SessionMiddleware } from './middlewares';
import { taskController } from './modules/task/task.module';
import { userController } from './modules/users/user.module';

const bootstrap = async () => {
  await connectPostgres();
  const server = express();
  const port = appConfig.port;

  server.use(express.json());
  server.use(SessionMiddleware);
  server.use(privateRoutes);
  server.use(logRequestMiddleware);
  server.use(rateLimiter);
  server.use('/task', taskController.router);
  server.use('/user', userController.router);
  server.use((req: Request) => {
    throw new NotFoundException(`Route ${req.originalUrl} not found.`);
  });

  server.use(ErrorHandler);

  logRoutes(server);

  server.listen(port, () => console.log(`Server started on port ${port}`));
};

bootstrap();
