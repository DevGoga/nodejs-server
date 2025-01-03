import express, { Express, Request } from 'express';
import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize-typescript';
import { logRoutes } from '../../bootstrap';
import { appConfig } from '../../config';
import { NotFoundException } from '../../exception';
import { ErrorHandler, logRequestMiddleware, privateRoutes, rateLimiter, SessionMiddleware } from '../../middlewares';
import { TaskController } from '../task';

@injectable()
export class Server {
  private readonly server: Express;

  constructor(
    @inject(TaskController)
    private readonly taskController: TaskController,
  ) {
    this.server = express();
  }

  private async connectPostgres() {
    const config = {}; // AppConfig

    const sequelize = new Sequelize(config);

    sequelize.addModels([]);

    await sequelize.sync({ alter: true });
  }

  async init() {
    // await this.connectPostgres();

    this.initMiddlewares();
    this.initControllers();
    this.initDefaultRouteNotFoundException();
    this.initErrorHandlers();
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

  private initErrorHandlers() {
    this.server.use(ErrorHandler);
  }

  private initControllers() {
    this.server.use('/task', this.taskController.router);
  }

  private initDefaultRouteNotFoundException() {
    this.server.use((req: Request) => {
      throw new NotFoundException(`Route ${req.originalUrl} not found.`);
    });
  }

  private start() {
    const port = appConfig.port;

    this.server.listen(port, () => {
      console.log(`Server is started on port ${port}...`);
    });
  }
}
