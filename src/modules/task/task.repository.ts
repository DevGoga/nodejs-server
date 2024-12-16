import { existsSync, readFileSync, writeFileSync } from 'fs';
import { UpdateTaskBodyDto } from '../../common';
import { SortDirection } from '../../common/sort-direction.enum';
import { FindAllTaskQueryDto, TaskSortBy } from './dto/find-all-task-query.dto';
import { Task } from './task.types';

let storage: Task[] = [];
const filename = 'tasks.json';

const saveStorageToFile = () => writeFileSync(filename, JSON.stringify(storage, null, 2));

if (existsSync(filename)) {
  storage = JSON.parse(readFileSync(filename, 'utf-8'));
} else {
  saveStorageToFile();
}

export class TaskRepository {
  create(dto: Omit<Task, 'id'>) {
    const maxId = storage.sort((a, b) => b.id - a.id)[0]?.id ?? 0;
    storage.push({ ...dto, id: maxId + 1 });
    saveStorageToFile();
    return storage[storage.length - 1];
  }

  delete(id: Task['id']) {
    storage = storage.filter((item) => item.id !== id);
    saveStorageToFile();
    return true;
  }

  update(id: Task['id'], dto: UpdateTaskBodyDto) {
    const taskIndex = storage.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new Error('ERR-504: Database does not have this record');
    }

    storage[taskIndex] = { ...storage[taskIndex], ...dto };

    saveStorageToFile();
    return storage[taskIndex];
  }

  getById(id: Task['id']): Task | null {
    return storage.find((task) => task.id === id) ?? null;
  }

  getAll({ page = 1, limit = 10, sortDirection = SortDirection.desc, sortBy = TaskSortBy.id }: FindAllTaskQueryDto) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const tasks = storage
      .sort((a, b) => {
        return Number(a[sortBy] > b[sortBy]);
      })
      .slice(startIndex, endIndex);

    return { tasks, total: storage.length };
  }
}
