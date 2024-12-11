import { Request, Response } from 'express';
import { validation } from '../validation';
import { CreateTaskDto, DeleteTaskParamsDto } from './dto';
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
};

export default TaskController;
