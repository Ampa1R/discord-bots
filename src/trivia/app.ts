import { Inject, OnlyInstantiableByContainer } from 'typescript-ioc';
import BotService from './services/bot';
import TriviaService from './services/trivia';

@OnlyInstantiableByContainer
export default class TriviaApp {
    constructor(@Inject private BotService: BotService, @Inject private TriviaService: TriviaService) {
        console.log('trivia init', Date.now());
        this.setup();
    }

    setup(): void {
        this.BotService.onMessage('start', () => {
            this.TriviaService.start();
        });
    }
}
