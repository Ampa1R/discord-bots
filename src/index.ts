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

main();
