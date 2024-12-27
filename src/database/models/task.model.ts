import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({ tableName: 'tasks' })
export class TaskModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  public id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public title: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public authorId: number;

  @BelongsTo(() => UserModel, {
    as: 'author',
    foreignKey: 'authorId',
    onDelete: 'CASCADE',
  })
  public author: UserModel;
}
