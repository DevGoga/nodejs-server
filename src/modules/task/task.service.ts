import { injectable } from 'inversify';
import { Op } from 'sequelize';
import { SortDirection } from '../../common/sort-direction.enum';
import { TaskModel, UserModel } from '../../database/models';
import { ForbiddenException, NotFoundException } from '../../exceptions';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { FindAllTaskQueryDto, TaskSortBy } from './dto/find-all-task-query.dto';

@injectable()
export class TaskService {
  async create(dto: CreateTaskDto, authorId: number) {
    const assignee = await UserModel.findOne({ where: { id: dto.assigneeId } });

    if (!assignee) {
      throw new NotFoundException(`User with id [${dto.assigneeId}] is not exist`);
    }

    return await TaskModel.create({ ...dto, authorId });
  }

  async get(id: TaskModel['id']) {
    const task = await TaskModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          attributes: ['id', 'nick'],
          as: 'author',
        },
        {
          model: UserModel,
          attributes: ['id', 'nick'],
          as: 'assignee',
        },
      ],
    });

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

    return task.update(dto);
  }

  async all(dto: FindAllTaskQueryDto) {
    const { limit, offset, sortBy = TaskSortBy.id, sortDirection = SortDirection.asc, search } = dto;

    const task = await TaskModel.findAll({
      include: [
        { model: UserModel, attributes: ['id', 'nick'], as: 'author' },
        { model: UserModel, attributes: ['id', 'nick'], as: 'assignee' },
      ],
    });

    const where = {
      ...(search
        ? { [Op.or]: [{ title: { [Op.iLike]: `%${search}%` } }, { description: { [Op.iLike]: `%${search}%` } }] }
        : {}),
    };

    const { count } = await TaskModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[sortBy, sortDirection]],
    });

    return { total: count, limit, offset, data: task };
  }

  async getMyAuthored(id: UserModel['id'], dto: FindAllTaskQueryDto) {
    const { limit = 10, offset = 0, sortBy = 'id', search } = dto;

    const where = {
      authorId: id,
      ...(search
        ? { [Op.or]: [{ title: { [Op.iLike]: `%${search}%` } }, { description: { [Op.iLike]: `%${search}%` } }] }
        : {}),
    };

    const { rows, count } = await TaskModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[sortBy, 'ASC']],
    });

    return { total: count, limit, offset, data: rows };
  }

  async getMyAssigned(id: TaskModel['assigneeId'], dto: FindAllTaskQueryDto) {
    const { limit = 10, offset = 0, sortBy = 'id', search } = dto;

    const where = {
      assigneeId: id,
      ...(search
        ? { [Op.or]: [{ title: { [Op.iLike]: `%${search}%` } }, { description: { [Op.iLike]: `%${search}%` } }] }
        : {}),
    };

    const { rows, count } = await TaskModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[sortBy, 'ASC']],
    });

    return { total: count, limit, offset, data: rows };
  }
}
