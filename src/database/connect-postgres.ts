import { Sequelize } from 'sequelize-typescript';
import { TaskModel, UserModel } from './models';

export const connectPostgres = async (): Promise<void> => {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    logging: false,
    host: 'localhost',
    database: 'goga',
    username: 'postgres',
    password: 'postgrespassword',
    port: 5432,
  });

  sequelize.addModels([TaskModel, UserModel]);
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  console.log('Connected Postgres');
};
