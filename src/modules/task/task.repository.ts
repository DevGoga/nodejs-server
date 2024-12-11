import { existsSync, readFileSync, writeFileSync } from 'fs';
import { Task } from './task.types';

let storage: Task[] = [];
const filename = 'tasks.json';

const saveStorageToFile = () => writeFileSync(filename, JSON.stringify(storage));

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
};

export default TaskRepository;
