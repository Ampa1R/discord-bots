import cluster from 'cluster';
import { init } from '3nv';
init({ modifyProcessEnv: true });

import RedisService from './services/redis';
import MemeService from './services/meme';
import BotService from './services/bot';

const main = () => {
  const redisService = new RedisService();
  const memeService = new MemeService();
  new BotService(redisService, memeService);
};

if (cluster.isPrimary) {
  cluster.fork();
  cluster.on('exit', () => {
      cluster.fork();
  });
} else {
  main();
}
