import { PaginationDto, UpdateTaskBodyDto } from '../../common';
import { CreateTaskDto } from './dto';
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
    return TaskRepository.update(id, dto);
  },
  get(id: Task['id']) {
    return TaskRepository.getById(id);
  },
  all(dto: PaginationDto) {
    return TaskRepository.getAll(dto);
  },
};
