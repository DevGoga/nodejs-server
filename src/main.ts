import 'reflect-metadata';
import express from 'express';
import { logRoutes } from './bootstrap';
import { appConfig } from './config';
import { ErrorHandler, logRequestMiddleware, privateRoutes, rateLimiter } from './middlewares';
import { userRouter } from './modules/router';
import { taskController } from './modules/task/task.module';

const server = express();

const port = appConfig.port;

console.log('Running on port', port);

server.use(express.json());
server.use(privateRoutes);
server.use(logRequestMiddleware);
server.use(rateLimiter);
server.use('/user', userRouter);
server.use('/task', taskController.router);
server.use(ErrorHandler);

logRoutes(server);
server.listen(port, () => console.log(`Server started on port ${port}`));
