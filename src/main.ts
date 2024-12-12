import 'reflect-metadata';
import express from 'express';
import { logRoutes } from './bootstrap';
import { ErrorHandler, logRequestMiddleware, privateRoutes, rateLimiter } from './middlewares';
import { taskRouter, userRouter } from './modules/router';

const server = express();

const port = 2000;

server.use(express.json());
server.use(privateRoutes);
server.use(logRequestMiddleware);
server.use(rateLimiter);
server.use('/user', userRouter);
server.use('/task', taskRouter);
server.use(ErrorHandler);

logRoutes(server);
server.listen(port, () => console.log(`Server started on port ${port}`));
