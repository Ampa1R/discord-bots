import Discord from 'discord.js';
// import TriviaService from './trivia';
import abilities from '../data/abilities.json';

export default class BotService {
    readonly token = process.env.TRIVIA_TOKEN!;
    readonly channelId = process.env.TRIVIA_CHANNEL_ID!;
    readonly prefix = process.env.TRIVIA_PREFIX!;
    readonly postedMemesPrefix = process.env.REDIS_KEY_PREFIX;
    readonly sendingInterval = 3 * 60 * 60 * 1000;
    readonly abilties: Ability[] = abilities;

    private client: Discord.Client;

    constructor() {
        console.log('bot service init', Date.now());
        
        this.client = new Discord.Client();

        this.client.login(this.token);

        this.client.on('ready', async () => {
            console.log("Trivia Spirit is ready!");
        });

        this.client.on('message', async (message: Discord.Message) => {
            if (message.author.bot) return;
            if (!message.content.startsWith(this.prefix)) return;
            message.channel.send('Я НЕ БОТ ТЫ ДОЛБАЕБ!!1')
        });
        this.sendMessage();
    }

    private sendMessage() {

        const channel = this.client.channels.resolve(this.channelId);
        if (channel instanceof Discord.TextChannel) {
            channel.send('message');
        }
    }

    public onMessage(command: string, handler: Function): void {
        console.log(command, handler);
    }
}

// AbilityQuestionTypes
    // 

// BotService recieve message !start
// TriviaService starts game
    // TriviaService gets random question
        // _QuestionService choose one correct option and one type of questions
        // _QuestionService random other options
// BotService send question to channel
    // TriviaService start the timer

// ...x seconds later

    // TriviaService stops the game
// BotService collects answers
    // TriviaService sends correct answer to channel

// *handle end of game*
