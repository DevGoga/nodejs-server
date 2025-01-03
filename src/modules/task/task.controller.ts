import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IdNumberDto } from '../../common';
import { BaseController } from '../../common/base.controller';
import { Route } from '../../common/types';
import { AuthGuard } from '../../guards';
import { validation } from '../../utilites';
import { TaskService } from './task.service';

@injectable()
export class TaskController extends BaseController {
  constructor(
    @inject(TaskService)
    private readonly service: TaskService,
  ) {
    super();
    this.initRoutes();
  }

  initRoutes() {
    const routes: Route[] = [
      { path: '', method: 'post', handler: this.create, middleware: [AuthGuard] },
      // { path: '/:id/time', method: 'post', handler: ?},

      { path: '', method: 'get', handler: this.getAll },
      { path: '/:id', method: 'get', handler: this.getById },
      // { path: '/my/authored', method: 'get', handler: ? },
      // { path: '/my/assigned', method: 'get', handler: ? },

      { path: '/:id', method: 'put', handler: this.update, middleware: [AuthGuard] },

      { path: '/:id', method: 'delete', handler: this.delete, middleware: [AuthGuard] },
    ];

    this.addRoute(routes);
  }

  create(req: Request, res: Response) {}

  delete(req: Request, res: Response) {}

  update(req: Request, res: Response) {}

  getById(req: Request, res: Response) {
    const { id } = validation(IdNumberDto, req.params);
    const result = this.service.get(id);

    res.json(result);
  }

  getAll(req: Request, res: Response) {}
}

export default TaskController;
