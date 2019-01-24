import fs from 'fs';
import streams from './streams';
import messages from '../config/messages';

const {
  helpMessage,
  noActionMessage,
  noFileMessage,
  noFileExistMessage
} = messages;

export const validatePath = filePath => {
  if (!fs.existsSync(filePath)) {
    throw new Error(noFileExistMessage);
  }
};

export const validateArgs = (file, action) => {
  if (!action || typeof action !== 'string') {
    throw new Error(helpMessage);
  }
  if (!streams[action]) {
    throw new Error(noActionMessage);
  }
  if (!file || typeof file !== 'string') {
    throw new Error(noFileMessage);
  }
};

