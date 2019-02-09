import axios from 'axios';

import messages from './config/messages';
const { wrongIpMessage } = messages;

export default class Geolocation {
  constructor(fetchRequest = axios.request){
    this.url = 'http://ip-api.com/json/';
    this.fetchRequest = fetchRequest;
  }

  getGeoData = async (ip) => {
    const currentIp = ip instanceof Object ? '' : ip;
    const { data } = await this.fetchRequest({
      baseURL: this.url,
      url: currentIp
    });
    if (data.message) {
      throw new Error(wrongIpMessage);
    }
    return data;
  };
}