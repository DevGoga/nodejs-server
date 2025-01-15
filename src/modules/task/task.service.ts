import { injectable } from 'inversify';
import { TaskModel, UserModel } from '../../database/models';
import { ForbiddenException, NotFoundException } from '../../exceptions';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { FindAllTaskQueryDto, TaskSortBy } from './dto/find-all-task-query.dto';

@injectable()
export class TaskService {
  async create(dto: CreateTaskDto, authorId: number) {
    return await TaskModel.create({ ...dto, authorId });
  }

  async get(id: TaskModel['id']) {
    const task = await TaskModel.findByPk(id);

    if (!task) {
      throw new NotFoundException(`Task with id [${id}] is not exist`);
    }

    return task;
  }

  async delete(id: TaskModel['id'], userId: UserModel['id']) {
    const task = await this.get(id);

    if (userId !== task.authorId) {
      throw new ForbiddenException();
    }

    return TaskModel.destroy({ where: { id } });
  }

  async update(id: TaskModel['id'], dto: UpdateTaskDto, userId: UserModel['id']) {
    const task = await this.get(id);

    if (userId !== task.authorId) {
      throw new ForbiddenException();
    }

    return TaskModel.update(dto, { where: { id }, returning: true });
  }

  async all(dto: FindAllTaskQueryDto) {
    const { limit, offset } = dto;
    const { rows, count } = await TaskModel.findAndCountAll({
      limit,
      offset,
      order: [TaskSortBy.id],
    });

    return { total: count, limit, offset, data: rows };
  }
}
