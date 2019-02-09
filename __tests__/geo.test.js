import '@babel/polyfill';

import Geolocation from '../src/Geolocation';
import mockRequest from './mocks/mockRequest';
import {
  withIpData,
  withoutIpData
} from './fixtures/geoData';

describe('geolocation', () => {
  it('get geodata with custom ip', async () => {
    const fetchRequest = mockRequest(withIpData);
    const geo = new Geolocation(fetchRequest);
    const geoData = await geo.getGeoData('123.123.123.123');
    const { data } = withIpData;

    expect(geoData).toEqual(data);
  });

  it('get geodata with default ip', async () => {
    const fetchRequest = mockRequest(withoutIpData);
    const geo = new Geolocation(fetchRequest);
    const geoData = await geo.getGeoData();
    const { data } = withoutIpData;

    expect(geoData).toEqual(data);
  });
});