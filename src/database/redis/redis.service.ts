import { injectable } from 'inversify';
import { createClient, SetOptions } from 'redis';
import { appConfig } from '../../config';

@injectable()
export class RedisService {
  private redis: ReturnType<typeof createClient>;

  async connect() {
    if (this.redis) return;

    const client = createClient({
      url: appConfig.redisUrl,
    });

    try {
      await client.connect();
    } catch (err) {
      console.log("Can't connect to redis:");
      throw err;
    }

    this.redis = client;
  }

  async set(key: string, value: Record<string, any>, options?: SetOptions): Promise<string | null> {
    const json = JSON.stringify(value);

    return this.redis.set(key, json, options);
  }

  async get<T extends Record<string, any>>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value);
  }

  async delete(key: string): Promise<number> {
    return this.redis.del(key);
  }
}
