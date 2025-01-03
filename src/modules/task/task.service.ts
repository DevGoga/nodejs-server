import { injectable } from 'inversify';
import { CreateTaskDto } from './dto';
import { FindAllTaskQueryDto } from './dto/find-all-task-query.dto';
import { UpdateTaskBodyDto } from './dto/update-task.dto';
import { Task } from './task.types';

@injectable()
export class TaskService {
  create(dto: CreateTaskDto, authorId: number) {}

  delete(id: Task['id']) {}

  update(id: Task['id'], dto: UpdateTaskBodyDto) {}

  get(id: Task['id']) {}

  all(dto: FindAllTaskQueryDto) {}
}
