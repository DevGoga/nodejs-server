import { Request, Response } from 'express';
import { DeleteTaskParamsDto, UpdateTaskBodyDto, UpdateTaskParamsDto } from '../../common';
import { GetTaskParamsDto } from '../../common/get-task.dto';
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
    const dto = validation(DeleteTaskParamsDto, req.params);
    const result = TaskService.delete(dto.id);

    res.json(result);
  },

  update(req: Request, res: Response) {
    const dto = validation(UpdateTaskBodyDto, req.body);
    const { id } = validation(UpdateTaskParamsDto, req.params);
    const result = TaskService.update(id, dto);

    res.json(result);
  },
  getById(req: Request, res: Response) {
    const { id } = validation(GetTaskParamsDto, req.params);
    const result = TaskService.get(id);

    res.json(result);
  },
};

export default TaskController;
