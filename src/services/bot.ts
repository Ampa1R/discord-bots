import Discord from 'discord.js';
import MemeService from './meme';
import RedisService from './redis';

export default class BotService {
    readonly token = process.env.BOT_TOKEN!;
    readonly channelId = process.env.CHANNEL_ID!;
    readonly prefix = process.env.BOX_PREFIX!;

    private client: Discord.Client;

    constructor(readonly redisService: RedisService, readonly memeService: MemeService) {
        this.client = new Discord.Client();

        this.client.login(this.token);

        this.client.on('ready', async () => {
            console.log('I\'m ready');
            this.sendImg();
            setInterval(() => this.sendImg(), 86400000);
        });

        this.client.on('message', async function (_message: Discord.Message) {
            // if (message.author.bot) return;
            // if (!message.content.startsWith(this.prefix)) return;
            // message.channel.send('Я НЕ БОТ ТЫ ДОЛБАЕБ!!1')
        });
    }

    private async sendImg() {
        const url = await this.memeService.getImageUrl();
        const attachment = new Discord.MessageAttachment(url);

        const channel = this.client.channels.resolve(this.channelId);
        if (channel instanceof Discord.TextChannel) {
            channel.send('А вот и свежий мем!)', attachment);
        }
    }
}
