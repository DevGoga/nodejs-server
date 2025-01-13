import { Sequelize } from 'sequelize-typescript';
import { appConfig } from '../config';

export const connectPostgres = async (): Promise<void> => {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    logging: false,
    host: appConfig.postgresHost,
    database: appConfig.postgresdDb,
    username: appConfig.postgresUser,
    password: appConfig.postgresPassword,
    port: appConfig.postgresPort,
  });

  await sequelize.sync();

  console.log('Connected Postgres');
};
