import { compareSync, hashSync } from 'bcrypt';
import { UpdateTaskBodyDto } from '../../common';
import { appConfig } from '../../config';
import { NotFoundException } from '../../errors';
import { CreateTaskDto } from './dto';
import { FindAllTaskQueryDto } from './dto/find-all-task-query.dto';
import TaskRepository from './task.repository';
import { Task } from './task.types';

export const TaskService = {
  create(dto: CreateTaskDto) {
    const hash = hashSync(dto.description, appConfig.passwordRounds);

    return TaskRepository.create({
      ...dto,
      description: hash,
    });
  },
  delete(id: Task['id']) {
    return { result: TaskRepository.delete(id) };
  },

  update(id: Task['id'], dto: UpdateTaskBodyDto) {
    const task = TaskRepository.getById(id);

    if (task === null) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    return TaskRepository.update(id, dto);
  },
  get(id: Task['id']) {
    debugger;
    const dto = {
      email: 'user@mail.ru',
      password: 'qwerty123',
    };

    const user = TaskRepository.getById(1); // UserRepository.findOneByEmail(dto.email);

    if (!user) {
      throw new Error(`User ${id} not found`);
    }

    if (compareSync(dto.password, user.description)) {
      console.log('Успех');
      debugger;
    }

    return TaskRepository.getById(id);
  },
  all(dto: FindAllTaskQueryDto) {
    return TaskRepository.getAll(dto);
  },
};
