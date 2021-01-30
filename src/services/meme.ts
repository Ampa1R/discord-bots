import axios from 'axios';

export default class MemeService {
    readonly API_URL = 'https://dota2.ru/memes/best/ajaxList?period=day&category%5B%5D=dota2';

    constructor () {

    }

    async getImageUrl () {
        const res = await axios.get(this.API_URL);
        const dataImgTagIndex = res.data.toString().indexOf('data-img-name');
        const dataImageTag = res.data.slice(dataImgTagIndex, dataImgTagIndex + 130);
        const re = new RegExp(/\/img\/memes\/.+\.\w+\?\d/);
        return `https://dota2.ru/${re.exec(dataImageTag)}`;
    }
}