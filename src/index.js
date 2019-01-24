#!/usr/bin/env node

import '@babel/polyfill';

import program from 'commander';
import streams from './utils/streams';

import { validateArgs } from './utils/validation';
import messages from './config/messages';

const { helpMessage } = messages;

program
  .version('1.0.0')
  .description('Choose appropriate action and define a file path')
  .option('-f, --file [path]', 'define a file path')
  .option('-a, --action [stream]', 'choose an action')
  .action(async ({ file, action }) => {
    try {
      validateArgs(file, action);
      streams[action](file);
    } catch (e) {
      console.error(e);
    }
  });


program.on('--help', () => console.log(helpMessage));

program.parse(process.argv);
