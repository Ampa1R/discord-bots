import Discord from 'discord.js';
import MemeService from './meme';
import RedisService from './redis';
import { generateMemeComment } from '../helpers';

export default class BotService {
    readonly token = process.env.MEME_TOKEN!;
    readonly channelId = process.env.MEME_CHANNEL_ID!;
    readonly prefix = process.env.MEME_PREFIX!;
    readonly postedMemesPrefix = process.env.REDIS_MEME_PREFIX;
    readonly sendingInterval = 3 * 60 * 60 * 1000;

    private client: Discord.Client;

    constructor(readonly redisService: RedisService, readonly memeService: MemeService) {
        this.client = new Discord.Client();

        this.client.login(this.token);

        this.client.on('ready', async () => {
            console.log("Memechantress is ready!");
            this.sendMeme();
            setInterval(() => this.sendMeme(), this.sendingInterval);
        });

        // this.client.on('message', async (message: Discord.Message) => {
        //     if (message.author.bot) return;
        //     if (!message.content.startsWith(this.prefix)) return;
        //     message.channel.send('Я НЕ БОТ ТЫ ДОЛБАЕБ!!1')
        // });
    }

    private async sendMeme(): Promise<void> {
        const memeUrl = await this.getUnpostedMeme();

        if (!memeUrl) {
            console.log('All actual memes has been posted');
            return;
        }

        const attachment = new Discord.MessageAttachment(memeUrl);
        const channel = this.client.channels.resolve(this.channelId);
        if (channel instanceof Discord.TextChannel) {
            await channel.send(generateMemeComment(), attachment);
            // TODO: check result of send
            await this.redisService.setWithTtl(`${this.postedMemesPrefix}${memeUrl}`, '1');
        }
    }

    private async getUnpostedMeme(): Promise<string | undefined> {
        const urls = await this.memeService.getMemeUrls();

        for (let url of urls) {
            if (await this.isUnpostedMeme(url)) return url;
        }
        return undefined;
    }

    private async isUnpostedMeme(url: string): Promise<boolean> {
        const isPosted = await this.redisService.exists(`${this.postedMemesPrefix}${url}`);

        if (isPosted) {
            console.log(`meme ${url} already has been posted`);
        } else {
            console.log(`meme ${url} is posted for the first time`);
        }
        return !isPosted;
    }
}
