import fs from 'fs';
import path from 'path';
import stream from 'stream';
import util from 'util';

import { consoleOutput, toUpperCase, parseCsvToJson } from './helper';
import { validatePath } from './validation';

const asyncReadDir = util.promisify(fs.readdir);
const asyncRemoveFile = util.promisify(fs.unlink);
const remoteCssPath = './files/remote.css';

export default {
  reverse: str => {
    try {
      const reader = new stream.Readable();
      const writer = new stream.Writable();
      const reversedStr = str.split('').reverse().join('');
      writer._write = consoleOutput;
      reader.push(reversedStr);
      reader.push(null);
      reader.pipe(writer);
    } catch (e) {
      console.error(e)
    }
  },
  transform: str => {
    try {
      const reader = new stream.Readable();
      const writer = new stream.Writable();
      writer._write = consoleOutput;
      reader.push(str);
      reader.push(null);
      reader.pipe(toUpperCase).pipe(writer);
    } catch (e) {
      console.error(e)
    }
  },
  outputFile: filePath => {
    try {
      validatePath(filePath);
      const reader = fs.createReadStream(filePath);
      const writer = new stream.Writable();
      writer._write = consoleOutput;
      reader.pipe(writer);
    } catch (e) {
      console.error(e)
    }
  },
  convertFromFile: filePath => {
    try {
      validatePath(filePath);
      const reader = fs.createReadStream(filePath);
      const writer = new stream.Writable();
      writer._write = consoleOutput;
      reader.pipe(parseCsvToJson).pipe(writer);
    } catch (e) {
      console.error(e)
    }
  },
  convertToFile: filePath => {
    try {
      validatePath(filePath);
      const { dir, name } = path.parse(filePath);
      const outputFilePath = `${dir}${path.sep}${name}.json`;
      const reader = fs.createReadStream(filePath);
      const writer = fs.createWriteStream(outputFilePath);
      reader.pipe(parseCsvToJson).pipe(writer);
    } catch (e) {
      console.error(e)
    }
  },
  cssBundler: async dirPath => {
    try {
      const outputFilePath = path.normalize(`${dirPath}${path.sep}bundle.css`);
      if (fs.existsSync(outputFilePath)) {
        await asyncRemoveFile(outputFilePath);
      }
      const assetsDir = await asyncReadDir(dirPath);
      const writer = fs.createWriteStream(outputFilePath);
      assetsDir.forEach((el, i) => {
        const filePath = path.join(dirPath, el);
        const reader = fs.createReadStream(filePath);
        reader.pipe(writer);
        if (i === assetsDir.length -1) {
          const remoteReader = fs.createReadStream(remoteCssPath);
          remoteReader.pipe(writer);
        }
      });
    } catch (e) {
      console.error(e)
    }
  }
}
