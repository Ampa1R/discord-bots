import axios from 'axios';

export default class MemeService {
    readonly API_URL = 'https://dota2.ru/memes/best/ajaxList?period=day&category%5B%5D=dota2';

    constructor () {

    }

    async getMemeUrls(): Promise<string[]> {
        const { data } = await axios.get<any, { data: string; }>(this.API_URL);
        const re = new RegExp(/img\/memes\/.+\.\w+\?\d/g);
        const matches = data.match(re);
        return matches === null ? [] : matches.map((urlPart: String) => `https://dota2.ru/${urlPart}`);
    }
}
