import { config as parseEnvFile } from 'dotenv';
import * as process from 'node:process';
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
  redisUsername: process.env.REDIS_USERNAME,
  redisPassword: process.env.REDIS_PASSWORD,
  redisPort: process.env.REDIS_PORT,
  redisDb: process.env.REDIS_DATABASE,
  redisHost: process.env.REDIS_HOST,
};

export const appConfig = validation(AppConfig, config);
