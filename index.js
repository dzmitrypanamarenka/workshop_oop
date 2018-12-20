import '@babel/polyfill';
import { DirWatcher, Importer } from './modules';

const watcher = new DirWatcher();
const importer = new Importer();

watcher.on('changed', data => {
  data.forEach(file => {
    const { path } = file;
    const output = importer.importSync(path);
    const csv = importer.convertCsv(output);
    console.log(csv)
  })
});

watcher.on('changed', data => {
  data.forEach(async file => {
    const { path } = file;
    const output = await importer.import(path);
    const csv = importer.convertCsv(output.toString());
    console.log(csv)
  })
});

watcher.watch('./data', 3000);




