import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';

export default class DirWatcher extends EventEmitter {
  constructor() {
    super();
    
    this.files = [];
  }
  watch = (inputPath, delay) => setInterval(() => {
    fs.readdir(inputPath, (err, files) => {
      if (err) {
        throw err;
      }
      const mappedFiles = files.map(el => {
        const pathToFile = path.join(inputPath, el);
        const fileInfo = fs.statSync(pathToFile);
        return {
          id: fileInfo.ino,
          date: fileInfo.ctimeMs,
          path: pathToFile
        }
      });
      if (!this.files.length) {
        this.files = mappedFiles;
        return;
      }
      const changedFiles = mappedFiles.filter(el => {
        const match = this.files.find(e => el.id === e.id);
        if (match) {
          return match.date !== el.date;
        }
        return el;
      });
      this.files = mappedFiles;
      if (changedFiles.length) {
        this.emit('changed', changedFiles);
      }
    })
  }, delay);
}
