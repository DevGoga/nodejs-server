import TaskController from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

const repository = new TaskRepository();
const service = new TaskService(repository);
export const taskController = new TaskController(service);
