import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import { logRoutes } from './bootstrap';
import { appConfig } from './config';
import { NotFoundException } from './errors';
import { ErrorHandler, logRequestMiddleware, privateRoutes, rateLimiter } from './middlewares';
import { taskController } from './modules/task/task.module';
import { userController } from './modules/users/task.module';

const bootstrap = () => {
  const server = express();
  const port = appConfig.port;

  server.use(express.json());
  server.use(privateRoutes);
  server.use(logRequestMiddleware);
  server.use(rateLimiter);
  server.use('/task', taskController.router);
  server.use('/user', userController.router);
  server.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundException(`Route ${req.originalUrl} not found.`));
  });

  server.use(ErrorHandler);

  logRoutes(server);

  server.listen(port, () => console.log(`Server started on port ${port}`));
};

bootstrap();
