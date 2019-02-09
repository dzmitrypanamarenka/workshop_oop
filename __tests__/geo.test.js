import Geolocation from '../src/Geolocation';

describe('geolocation', () => {
  const host = 'http://ip-api.com/json/';

  it('get geodata with default ip', async () => {
    const Geo = new Geolocation();
    const data = await Geo.getGeoData();

  });
});