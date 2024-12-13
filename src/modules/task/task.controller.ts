import { Request, Response } from 'express';
import { GetParamsId, UpdateTaskBodyDto } from '../../common';
import { BaseController } from '../../common/base-controller';
import { Route } from '../../common/types';
import { validation } from '../../utilites';
import { CreateTaskDto } from './dto';
import { FindAllTaskQueryDto } from './dto/find-all-task-query.dto';
import { TaskService } from './task.service';

export class TaskController extends BaseController {
  constructor(private readonly service: TaskService) {
    super();
    this.initRoutes();
  }

  initRoutes() {
    const routes: Route[] = [
      {
        path: '',
        method: 'post',
        handler: this.create,
      },
      {
        path: '',
        handler: this.getAll,
      },
      {
        path: '/:id',
        handler: this.getById,
      },
      {
        path: '/:id',
        method: 'delete',
        handler: this.delete,
      },
      {
        path: '/:id',
        method: 'put',
        handler: this.update,
      },
    ];

    this.addRoute(routes);
  }

  create(req: Request, res: Response) {
    const dto = validation(CreateTaskDto, req.body);
    const result = this.service.create(dto);

    res.json(result);
  }

  delete(req: Request, res: Response) {
    const dto = validation(GetParamsId, req.params);
    const result = this.service.delete(dto.id);

    res.json(result);
  }

  update(req: Request, res: Response) {
    const dto = validation(UpdateTaskBodyDto, req.body);
    const { id } = validation(GetParamsId, req.params);
    const result = this.service.update(id, dto);

    res.json(result);
  }

  getById(req: Request, res: Response) {
    const { id } = validation(GetParamsId, req.params);
    const result = this.service.get(id);

    res.json(result);
  }

  getAll(req: Request, res: Response) {
    const dto = validation(FindAllTaskQueryDto, req.query);
    const result = this.service.all(dto);

    res.json(result);
  }
}
