import { Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class UserModel extends Model {}
