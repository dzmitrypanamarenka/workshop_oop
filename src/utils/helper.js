import through2 from 'through2';
import csvParser from 'papaparse';

export const consoleOutput = (chunk, enc, next) => {
  const output = chunk.toString();
  console.log(output);
  next();
};

export const toUpperCase = through2(function (data, enc, next) {
  const chunk = data.toString().toUpperCase();
  this.push(Buffer.alloc(chunk.length, chunk));
  next();
});

export const parseCsvToJson = through2(function(data, enc, next) {
  const chunk = JSON.stringify(csvParser.parse(data.toString()).data);
  this.push(Buffer.alloc(chunk.length, chunk));
  next();
});
