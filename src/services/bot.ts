import Discord from 'discord.js';
import MemeService from './meme';
import RedisService from './redis';
import { generateMemeComment } from '../helpers';

export default class BotService {
    readonly token = process.env.BOT_TOKEN!;
    readonly channelId = process.env.CHANNEL_ID!;
    readonly prefix = process.env.BOX_PREFIX!;
    readonly postedMemesPrefix = '_m_';

    private client: Discord.Client;

    constructor(readonly redisService: RedisService, readonly memeService: MemeService) {
        this.client = new Discord.Client();

        this.client.login(this.token);

        this.client.on('ready', async () => {
            console.log('I\'m ready');
            this.sendMeme();
            setInterval(() => this.sendMeme(), 86400000);
        });

        // this.client.on('message', async (message: Discord.Message) => {
        //     if (message.author.bot) return;
        //     if (!message.content.startsWith(this.prefix)) return;
        //     message.channel.send('Я НЕ БОТ ТЫ ДОЛБАЕБ!!1')
        // });
    }

    private async sendMeme() {
        const memeUrl = await this.getUnpostedMeme();

        const attachment = new Discord.MessageAttachment(memeUrl);

        const channel = this.client.channels.resolve(this.channelId);
        if (channel instanceof Discord.TextChannel) {
            channel.send(generateMemeComment(), attachment);
            await this.redisService.setWithTtl(`${this.postedMemesPrefix}${memeUrl}`, '1');
        }
    }

    private async getUnpostedMeme(): Promise<string> {
        const url = await this.memeService.getImageUrl();
        const isMemePosted = await this.redisService.exists(`${this.postedMemesPrefix}${url}`);
        
        // TODO
        if (isMemePosted) {
            console.log(`meme ${url} already has been posted`);
        } else {
            console.log(`meme ${url} is posted for the first time`);
        }
        
        return url;
    }
}
