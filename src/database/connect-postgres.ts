import { Sequelize } from 'sequelize-typescript';

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

  await sequelize.authenticate();

  console.log('Connected Postgres');
};
