import { UpdateTaskBodyDto } from '../../common';
import { SortDirection } from '../../common/sort-direction.enum';
import { TaskModel, UserModel } from '../../database/models';
import { NotFoundException } from '../../errors';
import { CreateTaskDto } from './dto';
import { FindAllTaskQueryDto, TaskSortBy } from './dto/find-all-task-query.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.types';

export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  async create(dto: CreateTaskDto) {
    const task = await TaskModel.create({ ...dto, authorId: 1 });

    return task;
  }

  delete(id: Task['id']) {
    return { result: this.repository.delete(id) };
  }

  update(id: Task['id'], dto: UpdateTaskBodyDto) {
    const task = this.repository.getById(id);

    if (task === null) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    return this.repository.update(id, dto);
  }

  async get(id: Task['id']) {
    const task = await TaskModel.findByPk(id, {
      include: [{ model: UserModel, attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } }],
    });

    if (task === null) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    return task;
  }

  async all(dto: FindAllTaskQueryDto) {
    const sortBy = dto.sortBy ?? TaskSortBy.id;
    const sortDirection = dto.sortDirection ?? SortDirection.desc;

    const { rows, count } = await TaskModel.findAndCountAll({
      order: [[sortBy, sortDirection]],
      offset: dto.offset,
      limit: dto.limit,
    });

    return { data: rows, total: count };
  }
}
