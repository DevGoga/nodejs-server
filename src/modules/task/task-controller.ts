import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Request, Response } from 'express';
import { BadRequestException } from '../../errors';
import { CreateTaskDto, DeleteTaskParamsDto } from './dto';
import { TaskService } from './task-service';

const TaskController = {
  create(req: Request, res: Response) {
    const dto = plainToInstance(CreateTaskDto, req.body);
    const errors = validateSync(dto);

    if (errors.length) {
      const constraints = errors[0].constraints;
      let message = 'Unknown validation error';

      if (constraints) {
        message = constraints[Object.keys(constraints)[0]];
      }

      throw new BadRequestException(message);
    }

    const result = TaskService.create(dto);

    res.json(result);
  },
  delete(req: Request, res: Response) {
    const dto = plainToInstance(DeleteTaskParamsDto, req.params);
    const errors = validateSync(dto);
    if (errors.length) {
      const constraints = errors[0].constraints;
      let message = 'Unknown validation error';
      if (constraints) {
        message = constraints[Object.keys(constraints)[0]];
      }
      throw new BadRequestException(message);
    }
    const result = TaskService.delete(dto.id);
    res.json(result);
  },
};

export default TaskController;
