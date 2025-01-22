import dotenv from 'dotenv';
import { injectable } from 'inversify';
import { validation } from '../utilites';
import { AppConfig } from './app-config.dto';

@injectable()
export class ConfigService {
  private readonly config: AppConfig;

  constructor() {
    const path = process.env.NODE_ENV === 'prod' ? '.env.production' : '.env';

    dotenv.config({ path });

    const result = this.config();

    this.config = validation(AppConfig, result);
  }

  get env(): AppConfig {
    return this.config;
  }

  get redisConnectionString(): string {
    const username = this.config.redisUsername;
    const password = this.config.redisPassword;
    const port = this.config.redisPort;
    const host = this.config.redisHost;
    const database = this.config.redisDb;

    return `redis://${username}:${password}@${host}:${port}/${database}`;
  }
}
