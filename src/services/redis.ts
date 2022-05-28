import Redis from 'ioredis';
import Logger from './logger';

export default class RedisService {
  private readonly client: Redis;
  private readonly logger = new Logger(RedisService.name);
  private readonly defaultTtl = 7 * 24 * 60 * 60; // week

  constructor() {
    const REDIS_URL = process.env.REDIS_URL!;
    this.client = new Redis(REDIS_URL);

    this.client.on('connect', () => {
      this.logger.info(`Redis connected to ${REDIS_URL}`);
    });

    this.client.on('error', (error) => {
      this.logger.error('[REDIS ERROR]', error);
    });
  }

  public set(key: string, value: string): Promise<'OK'> {
    return this.client.set(key, value);
  }

  public setWithTtl(key: string, value: string, ttl: number = this.defaultTtl): Promise<'OK'> {
    return this.client.set(key, value, 'EX', ttl);
  }

  public get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  public async exists(key: string): Promise<boolean> {
    const res = await this.client.exists(key);
    return res === 1;
  }
}
