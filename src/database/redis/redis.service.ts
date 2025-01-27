import { SetOptions } from '@redis/client';
import { injectable } from 'inversify';
import { createClient } from 'redis';

@injectable()
export class RedisService {
  private redis: ReturnType<typeof createClient>;

  async connect(url: string): Promise<void> {
    if (this.redis) return;

    const client = createClient({ url });
    try {
      await client.connect();
    } catch (error) {
      console.log("Can't connect to redis:");
      throw error;
    }

    this.redis = client;
  }

  async set(key: string, value: Record<string, any>, options?: SetOptions) {
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

  async delete(key: string) {
    return await this.redis.del(key);
  }
}
