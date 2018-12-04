#!/usr/bin/env node

import '@babel/polyfill';
import program from 'commander';

import messages from './config/messages';
import Geolocation from './Geolocation';

const { helpMessage } = messages;

program
  .version('1.0.0')
  .description('Pass an IP address')
  .action(async (ipAddress) => {
    try {
      const Geo = new Geolocation();
      const data = await Geo.getGeoData(ipAddress);
      console.log(data)
    } catch (e) {
      console.error(e);
    }
  });


program.on('--help', () => console.log(helpMessage));

program.parse(process.argv);
