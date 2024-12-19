import { UpdateTaskBodyDto } from '../../common';
import { CreateTaskDto } from './dto';
import { FindAllTaskQueryDto } from './dto/find-all-task-query.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.types';

export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  create(dto: CreateTaskDto) {
    return this.repository.create(dto);
  }

  delete(id: Task['id']) {
    return { result: this.repository.delete(id) };
  }

  update(id: Task['id'], dto: UpdateTaskBodyDto) {
    const task = this.repository.getById(id);

    if (task === null) {
      throw new Error(`Task ${id} not found`);
    }

    return this.repository.update(id, dto);
  }

  get(id: Task['id']) {
    return this.repository.getById(id);
  }

  all(dto: FindAllTaskQueryDto) {
    return this.repository.getAll(dto);
  }
}
