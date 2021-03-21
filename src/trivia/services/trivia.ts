import { Inject } from 'typescript-ioc';
import BotService from './bot';

export default class TriviaService {
    constructor (@Inject private BotService: BotService) {
        console.log('trivia service init', Date.now());
    }

    start() {
        console.log(this.BotService);
    }
    
}
