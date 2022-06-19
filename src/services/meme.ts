import axios from 'axios';
import LoggerService from "./logger";

export default class MemeService {
  readonly API_URL = 'https://dota2.ru/memes/best/ajaxList?period=day&category%5B%5D=dota2';
  private readonly logger = new LoggerService(MemeService.name);

  constructor() {}

  async getMemeUrls(): Promise<string[]> {
    const { data }: { data: string } = await axios.get(this.API_URL);
    const re = new RegExp(/img\/memes\/.+\.\w+\?\d/g);
    const matches = data.match(re);
    if (matches === null) {
      this.logger.info('No memes found in dota2.ru response');
      return [];
    }
    return matches.map((urlPart: String) => `https://dota2.ru/${urlPart}`);
  }
}
