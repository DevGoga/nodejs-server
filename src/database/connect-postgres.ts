import { Sequelize } from 'sequelize-typescript';

export const connectPostgres = async (): Promise<void> => {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    logging: false,
    host: 'localhost',
    database: 'express',
    username: 'postgres',
    password: 'postgrespassword',
    port: 5432,
  });

  await sequelize.sync();

  console.log('Connected Postgres');
};
