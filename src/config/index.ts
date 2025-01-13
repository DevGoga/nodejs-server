import { config as parseEnvFile } from 'dotenv';
import { validation } from '../utilites';
import { AppConfig } from './app-config.dto';

parseEnvFile();

export type EnvStructure<T = any> = {
  [key in keyof T]: T[key] extends object ? EnvStructure<T[key]> : string | undefined;
};

const config: EnvStructure<AppConfig> = {
  passwordRounds: process.env.PASSWORD_ROUNDS,
  port: process.env.PORT,
  postgresUser: process.env.POSTGRES_USER,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresHost: process.env.POSTGRES_HOST,
  postgresPort: process.env.POSTGRES_PORT,
  postgresdDb: process.env.POSTGRES_DB,
};

export const appConfig = validation(AppConfig, config);
