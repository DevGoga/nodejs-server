import { CreateTaskDto, UpdateTaskParamsDto } from './dto';
import TaskRepository from './task.repository';
import { Task } from './task.types';

export const TaskService = {
  create(dto: CreateTaskDto) {
    return TaskRepository.create(dto);
  },
  delete(id: Task['id']) {
    return { result: TaskRepository.delete(id) };
  },
  update(id: Task['id'], dto: UpdateTaskParamsDto) {
    return TaskRepository.update(id, dto);
  },
};
