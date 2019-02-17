import axios from 'axios';

import mapForecastData from './adapter';
import messages from './config/messages';
const { wrongIpMessage } = messages;

class WeatherService {
  constructor(service) {
    this.service = service;
  }

  getForecast = async (city) => {
    const data = await axios.get(this.service);
    return mapForecastData(data);
  }
}