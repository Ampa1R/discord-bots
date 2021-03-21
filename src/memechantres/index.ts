import { config } from 'dotenv';
config();

import RedisService from './services/redis';
import MemeService from './services/meme';
import BotService from './services/bot';

export const initMemechantress = () => {
  const redisService = new RedisService();
  const memeService = new MemeService();
  new BotService(redisService, memeService);
};

