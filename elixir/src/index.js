import fs from 'fs';

class Middle {
  static getMiddle = (arr) => {
    const middleIndex = Math.round(arr.length / 2);
    return arr[middleIndex];
  }
}

class CustomFile {
  constructor(files){
    this.files = files;
  }

  filter = (fn) => {
    const filteredCol = this.files.filter(fn);
    return new CustomFile(filteredCol);
  };

  middle = () => {
    const middleItem = Middle.getMiddle(this.files);
    return new CustomFile(middleItem);
  };

  sort = () => {
    const sortedCol = this.files.sort();
    return new CustomFile(sortedCol);
  };

  plural = (symbol) => {
    const pluralItem = Main.plural(this.files, symbol);
    return new CustomFile(pluralItem);
  };

  upcase = () => {
    const upcaseItem = this.files.toUpperCase();
    return new CustomFile(upcaseItem);
  };

  IO = () => {
    console.log(this.files)
  }
}

class Main {
  static plural = (str, symbol) => {
    return str[str.length - 1] === 's' ? str : `${str}${symbol}`;
  };

  main = () => {
    const dir = fs.readdirSync('.');
    const files = new CustomFile(dir);
    return files
      .filter(file => file[0] !== '.')
      .sort()
      .middle()
      .plural('s')
      .upcase()
      .IO()
  }
}

const instance = new Main();
instance.main();