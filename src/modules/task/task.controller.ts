import { Request, Response } from 'express';
import { GetParamsId, PaginationDto, UpdateTaskBodyDto } from '../../common';
import { validation } from '../../utilites';
import { CreateTaskDto } from './dto';
import { TaskService } from './task.service';

const TaskController = {
  create(req: Request, res: Response) {
    const dto = validation(CreateTaskDto, req.body);
    const result = TaskService.create(dto);

    res.json(result);
  },

  delete(req: Request, res: Response) {
    const dto = validation(GetParamsId, req.params);
    const result = TaskService.delete(dto.id);

    res.json(result);
  },

  update(req: Request, res: Response) {
    const dto = validation(UpdateTaskBodyDto, req.body);
    const { id } = validation(GetParamsId, req.params);
    const result = TaskService.update(id, dto);

    res.json(result);
  },

  getById(req: Request, res: Response) {
    const { id } = validation(GetParamsId, req.params);
    const result = TaskService.get(id);

    res.json(result);
  },

  getAll(req: Request, res: Response) {
    const dto = validation(PaginationDto, req.body);
    const result = TaskService.all(dto);

    res.json(result);
  },
};

export default TaskController;
