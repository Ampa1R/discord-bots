import redis, { RedisClient } from 'redis';

export default class RedisService {
    readonly HOST: string = process.env.REDIS_HOST!;
    readonly PASS: string = process.env.REDIS_PASSWORD!;
    readonly defaultTtl = 60 * 60 * 24 * 30; // month
    private client: RedisClient;

    constructor() {
        this.client = redis.createClient(this.HOST, { password: this.PASS });

        this.client.on('error', function (error) {
            console.error('[REDIS ERROR]', error);
        });
    }

    public set(key: string, value: string): Promise<void> {
        return new Promise(res => {
            this.client.set(key, value, () => {
                res();
            });
        });
    }

    public setWithTtl(key: string, value: string, ttl: number = this.defaultTtl): Promise<void> {
        return new Promise(res => {
            this.client.set(key, value, 'EX', ttl, () => {
                res();
            });
        });
    }

    public get(key: string): Promise<string | null> {
        return new Promise((res, rej) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    rej(err);
                }
                res(value);
            });
        });
    }

    public async exists(key: string): Promise<boolean> {
        const value = await this.get(key);
        return value !== null;
    }
}
