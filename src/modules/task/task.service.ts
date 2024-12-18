import { UpdateTaskBodyDto } from '../../common';
import { CreateTaskDto } from './dto';
import { FindAllTaskQueryDto } from './dto/find-all-task-query.dto';
import TaskRepository from './task.repository';
import { Task } from './task.types';

export const TaskService = {
  create(dto: CreateTaskDto) {
    return TaskRepository.create(dto);
  },

  delete(id: Task['id']) {
    return { result: TaskRepository.delete(id) };
  },

  update(id: Task['id'], dto: UpdateTaskBodyDto) {
    const task = TaskRepository.getById(id);

    if (task === null) {
      throw new Error(`Task ${id} not found`);
    }

    return TaskRepository.update(id, dto);
  },

  get(id: Task['id']) {
    return TaskRepository.getById(id);
  },

  all(dto: FindAllTaskQueryDto) {
    return TaskRepository.getAll(dto);
  },
};
