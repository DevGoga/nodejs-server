import { existsSync, readFileSync, writeFileSync } from 'fs';
import { UpdateTaskBodyDto } from '../../common';
import { Task } from './task.types';

let storage: Task[] = [];
const filename = 'tasks.json';

const saveStorageToFile = () => writeFileSync(filename, JSON.stringify(storage, null, 2));

if (existsSync(filename)) {
  storage = JSON.parse(readFileSync(filename, 'utf-8'));
} else {
  saveStorageToFile();
}

const TaskRepository = {
  create(dto: Omit<Task, 'id'>) {
    const maxId = storage.sort((a, b) => b.id - a.id)[0]?.id ?? 0;
    storage.push({ ...dto, id: maxId + 1 });
    saveStorageToFile();
    return storage[storage.length - 1];
  },

  delete(id: Task['id']) {
    storage = storage.filter((item) => item.id !== id);
    saveStorageToFile();
    return true;
  },

  update(id: Task['id'], dto: UpdateTaskBodyDto) {
    const taskIndex = storage.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new Error(`Task ${id} not found`);
    }
    storage[taskIndex] = { ...storage[taskIndex], ...dto };

    saveStorageToFile();
    return storage[taskIndex];
  },

  getById(id: Task['id']) {
    const task = storage.find((task) => task.id === id);
    if (!task) {
      throw new Error(`Task ${id} not found`);
    }
    return task;
  },
};

export default TaskRepository;
