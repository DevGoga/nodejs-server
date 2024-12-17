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
};

export const appConfig = validation(AppConfig, config);
