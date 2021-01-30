import redis, { RedisClient } from 'redis';

export default class RedisService {
    readonly HOST: string = process.env.REDIS_HOST!;
    readonly PASS: string = process.env.REDIS_PASSWORD!;
    private client: RedisClient;

    constructor() {
        this.client = redis.createClient(this.HOST, { password: this.PASS });

        this.client.on('error', function (error) {
            console.error('[REDIS ERROR]', error);
        });
    }

    public set(key: string, value: string) {
        this.client.set(key, value);
    }

    public get(key: string) {
        this.client.get(key);
    }
}
