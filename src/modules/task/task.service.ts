import { injectable } from 'inversify';
import { TaskModel } from '../../database/models';
import { NotFoundException } from '../../exception';
import { CreateTaskDto } from './dto';
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

  async delete(id: TaskModel['id']) {
    await this.get(id);

    return TaskModel.destroy({ where: { id } });
  }

  async update(id: TaskModel['id'], dto: CreateTaskDto) {
    await this.get(id);

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
