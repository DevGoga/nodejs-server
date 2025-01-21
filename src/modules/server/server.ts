import express, { Express, Request } from 'express';
import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize-typescript';
import { logRoutes } from '../../bootstrap';
import { appConfig } from '../../config';
import { models } from '../../database/models/models';
import { NotFoundException } from '../../exceptions';
import { ErrorHandler, logRequestMiddleware, privateRoutes, rateLimiter, SessionMiddleware } from '../../middlewares';
import { TaskController } from '../task';
import { UserController } from '../users/user.controller';

@injectable()
export class Server {
  private readonly server: Express;

  constructor(
    @inject(TaskController)
    private readonly taskController: TaskController,

    @inject(UserController)
    private readonly userController: UserController,
  ) {
    this.server = express();
  }

  private async connectPostgres() {
    const config = {
      host: appConfig.postgresHost,
      database: appConfig.postgresdDb,
      username: appConfig.postgresUser,
      password: appConfig.postgresPassword,
      port: appConfig.postgresPort,
    };
    const sequelize = new Sequelize({ ...config, dialect: 'postgres', logging: false });

    sequelize.addModels(models);

    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    console.log('Successfully connected to database');
  }

  async init() {
    await this.connectPostgres();
    this.initMiddlewares();
    this.initController();
    this.initDefaultRoutNotFoundException();
    this.errorHandler();
    this.start();

    logRoutes(this.server);
  }

  private initMiddlewares() {
    this.server.use(express.json());
    this.server.use(SessionMiddleware);
    this.server.use(privateRoutes);
    this.server.use(logRequestMiddleware);
    this.server.use(rateLimiter);
  }

  private errorHandler() {
    this.server.use(ErrorHandler);
  }

  private initController() {
    this.server.use('/task', this.taskController.router);
    this.server.use('/user', this.userController.router);
  }

  private initDefaultRoutNotFoundException() {
    this.server.use((req: Request) => {
      throw new NotFoundException(`Routes ${req.originalUrl} not found.`);
    });
  }

  private start() {
    const port = appConfig.port;

    this.server.listen(port, () => console.log(`Server listening on port ${port}`));
  }
}
