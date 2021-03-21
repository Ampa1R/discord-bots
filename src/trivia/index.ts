import { config } from 'dotenv';
import { Container } from 'typescript-ioc';
config();
import TriviaApp from './app';

export const initTrivia = () => {
  Container.get(TriviaApp);
};

