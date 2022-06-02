import Discord, { Intents, MessageAttachment } from 'discord.js';
import MemeService from './meme';
import RedisService from './redis';
import LoggerService from './logger';
import { generateMemeComment } from '../helpers';

export default class BotService {
  private readonly logger = new LoggerService(BotService.name);
  private readonly token = process.env.BOT_TOKEN!;
  private readonly channelId = process.env.CHANNEL_ID!;
  private readonly postedMemesPrefix = process.env.REDIS_KEY_PREFIX;
  // private readonly prefix = process.env.BOX_PREFIX!;

  private readonly sendingInterval = 3 * 60 * 60 * 1000; // 3h
  // private readonly sendingInterval = 10 * 1000; // 10 sec

  private client: Discord.Client;

  constructor(readonly redisService: RedisService, readonly memeService: MemeService) {
    this.client = new Discord.Client({
      intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        // Intents.FLAGS.GUILD_PRESENCES,
      ],
    });

    this.client.on('ready', () => this.init());
    this.client.login(this.token);
    this.client.on('message', async (message: Discord.Message) => {
      if (message.author.bot) return;
      if (message.content === 'бот ты умер?') {
        message.channel.send('нет меня убило');
      }
    });
  }

  private init() {
    this.logger.info('Bot is ready');
    this.sendMeme();
    setInterval(() => this.sendMeme(), this.sendingInterval);
  }

  private async sendMeme(): Promise<void> {
    this.logger.debug('SendMeme method');
    const memeUrl = await this.getUnpostedMeme();

    if (memeUrl === null) {
      this.logger.info('All actual memes has been posted');
      return;
    }

    const channel = this.client.channels.resolve(this.channelId);
    if (channel instanceof Discord.TextChannel) {
      const messageAttachment = new MessageAttachment(memeUrl);
      const message = await channel.send({
        content: generateMemeComment(),
        files: [messageAttachment],
      });
      await message.react('👍');
      await message.react('👎');
      await this.redisService.setWithTtl(`${this.postedMemesPrefix}:${memeUrl}`, '1');
      this.logger.info(`Posted meme ${memeUrl}`);
    } else {
      this.logger.error('Channel is not DiscordChannel', channel);
    }
  }

  private async getUnpostedMeme(): Promise<string | null> {
    const urls = await this.memeService.getMemeUrls();

    for (const url of urls) {
      if (await this.isUnpostedMeme(url)) return url;
    }
    return null;
  }

  private async isUnpostedMeme(url: string): Promise<boolean> {
    const isPosted = await this.redisService.exists(`${this.postedMemesPrefix}:${url}`);

    if (isPosted) {
      this.logger.info(`meme already has been posted; url:${url}`);
    } else {
      this.logger.info(`meme will be posted for the first time; url:${url}`);
    }
    return !isPosted;
  }
}
