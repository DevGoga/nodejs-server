import { Sequelize } from 'sequelize-typescript';
import { TaskModel } from './models';

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

  sequelize.addModels([TaskModel]);
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  console.log('Connected Postgres');
};
