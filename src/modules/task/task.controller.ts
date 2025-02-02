import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IdNumberDto } from '../../common';
import { BaseController } from '../../common/base.controller';
import { Route } from '../../common/types';
import { UnauthorizedException } from '../../exceptions';
import { JwtGuard } from '../../guards';
import { validation } from '../../utilites';
import { JwtService } from '../users/jwt.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { FindAllTaskQueryDto } from './dto/find-all-task-query.dto';
import { TaskService } from './task.service';

@injectable()
export class TaskController extends BaseController {
  constructor(
    @inject(TaskService)
    private readonly taskService: TaskService,
    @inject(JwtService)
    private readonly jwtService: JwtService,
  ) {
    super();
    this.initRoutes();
  }

  initRoutes() {
    const jwtGuard = JwtGuard(this.jwtService);

    const middleware = [jwtGuard];

    const routes: Route[] = [
      { path: '', method: 'post', handler: this.create, middleware },
      { path: '', method: 'get', handler: this.getAll },
      { path: '/authored', method: 'get', handler: this.getAllByTasks, middleware },
      { path: '/assigned', method: 'get', handler: this.getMyAssigned, middleware },
      { path: '/:id', method: 'get', handler: this.getById },
      { path: '/:id', method: 'put', handler: this.update, middleware },
      { path: '/:id', method: 'delete', handler: this.delete, middleware },
    ];

    this.addRoute(routes);
  }

  async create(req: Request, res: Response) {
    const dto = validation(CreateTaskDto, req.body);
    const authorId = res.locals.user.id;

    if (!authorId) {
      throw new UnauthorizedException();
    }

    const result = await this.taskService.create(dto, authorId);

    res.json(result);
  }

  async delete(req: Request, res: Response) {
    const { id } = validation(IdNumberDto, req.params);
    const userId = res.locals.user.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const result = await this.taskService.delete(id, userId);

    res.json(result);
  }

  async update(req: Request, res: Response) {
    const dto = validation(UpdateTaskDto, req.body);
    const { id } = validation(IdNumberDto, req.params);

    const userId = res.locals.user.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const result = await this.taskService.update(id, dto, userId);

    res.json(result);
  }

  async getById(req: Request, res: Response) {
    const { id } = validation(IdNumberDto, req.params);
    const result = await this.taskService.get(id);

    res.json(result);
  }

  async getAll(req: Request, res: Response) {
    const dto = validation(FindAllTaskQueryDto, req.query);

    const result = await this.taskService.all(dto);

    res.json({ ...result, ...dto });
  }

  async getAllByTasks(req: Request, res: Response) {
    const dto = validation(FindAllTaskQueryDto, req.query);
    const userId = res.locals.user.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const result = await this.taskService.getMyAuthored(userId, dto);

    res.json(result);
  }

  async getMyAssigned(req: Request, res: Response) {
    const dto = validation(FindAllTaskQueryDto, req.query);
    const userId = res.locals.user.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const result = await this.taskService.getMyAssigned(userId, dto);

    res.json(result);
  }
}

export default TaskController;
