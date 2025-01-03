import { Container } from 'inversify';
import TaskController from './task.controller';
import { TaskService } from './task.service';

export const createTaskModule = (): Container => {
  const container = new Container();

  container.bind(TaskService).to(TaskService).inSingletonScope();
  container.bind(TaskController).to(TaskController).inSingletonScope();

  return container;
};
