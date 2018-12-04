import axios from 'axios';

import messages from './config/messages';
const { wrongIpMessage } = messages;

export default class Geolocation {
  constructor(){
    this.ip = '';
    this.url = 'http://ip-api.com/json/'
  }

  getGeoData = async (ip) => {
    const currentIp = ip instanceof Object ? this.ip : ip;
    const { data } = await axios.get(`${this.url}${currentIp}`);
    if (data.message) {
      throw new Error(wrongIpMessage);
    }
    return data;
  };
}