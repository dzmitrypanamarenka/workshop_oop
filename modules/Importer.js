import fs from 'fs';
import Papa from 'papaparse';
import util from 'util';

const asyncReadFile = util.promisify(fs.readFile);

const csvConfig = {
  header: true
};

export default class Importer {
  import = (path) => asyncReadFile(path, (err, data) => {
    return new Promise((res, rej) => err ? rej(err) : res(data.toString()));
  });
  
  importSync = path => fs.readFileSync(path).toString();
  
  convertCsv = csvString => Papa.parse(csvString, csvConfig).data;
}
