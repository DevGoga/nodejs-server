import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IdNumberDto } from '../../common';
import { BaseController } from '../../common/base.controller';
import { Route } from '../../common/types';
import { UnauthorizedException } from '../../exceptions';
import { AuthGuard } from '../../guards';
import { validation } from '../../utilites';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { FindAllTaskQueryDto } from './dto/find-all-task-query.dto';
import { TaskService } from './task.service';

@injectable()
export class TaskController extends BaseController {
  constructor(
    @inject(TaskService)
    private readonly taskService: TaskService,
  ) {
    super();
    this.initRoutes();
  }

  initRoutes() {
    const routes: Route[] = [
      { path: '', method: 'post', handler: this.create, middleware: [AuthGuard] },
      { path: '', method: 'get', handler: this.getAll },
      { path: '/authored', method: 'get', handler: this.getAllByTasks, middleware: [AuthGuard] },
      { path: '/:id', method: 'get', handler: this.getById },
      { path: '/:id', method: 'put', handler: this.update, middleware: [AuthGuard] },
      { path: '/:id', method: 'delete', handler: this.delete, middleware: [AuthGuard] },
    ];

    this.addRoute(routes);
  }

  async create(req: Request, res: Response) {
    const dto = validation(CreateTaskDto, req.body);
    const authorId = req.session.user?.id;

    if (!authorId) {
      throw new UnauthorizedException();
    }

    const result = await this.taskService.create(dto, authorId);

    res.json(result);
  }

  async delete(req: Request, res: Response) {
    const { id } = validation(IdNumberDto, req.params);
    const userId = req.session.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const result = await this.taskService.delete(id, userId);

    res.json(result);
  }

  async update(req: Request, res: Response) {
    const dto = validation(UpdateTaskDto, req.body);
    const { id } = validation(IdNumberDto, req.params);

    const userId = req.session.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const result = await this.taskService.update(id, dto, userId);

    res.json(result);
  }

  async getById(req: Request, res: Response) {
    const { id } = validation(IdNumberDto, req.params);
    const result = await this.taskService.getIdNick(id);

    res.json(result);
  }

  async getAll(req: Request, res: Response) {
    const dto = validation(FindAllTaskQueryDto, req.query);
    const result = await this.taskService.all(dto);

    res.json({ ...result, ...dto });
  }

  async getAllByTasks(req: Request, res: Response) {
    const dto = validation(FindAllTaskQueryDto, req.query);
    const userId = req.session.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const result = await this.taskService.getMyAuthored(userId, dto);

    res.json(result);
  }
}

export default TaskController;
