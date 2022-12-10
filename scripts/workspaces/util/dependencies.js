const glob = require('glob'),
  {
    readFileSync
  } = require('fs'),
  
  path = require('path');

class Dependencies {
  dependencies = {};

  build(file) {
    if (typeof this.dependencies[file] !== 'undefined') {
      return;
    }

    try {
      const pack = JSON.parse(readFileSync(`./${file}`, 'utf-8')),
        dir = path.resolve('./') + '/',
        packageFileDirectory = file.replace('/package.json', '');
      if (pack.workspaces) {
        this.dependencies[file] = pack.workspaces.map(l => path.resolve(`${packageFileDirectory}/${l}`).replace(dir, '') + '/package.json');
        this.dependencies[file].forEach(l => this.build(l));
      } else {
        this.dependencies[file] = [];
      }

    } catch(e) {
      console.log(e);
    } 
  }

  async all() {
    const files = await this.getApps();
    for (const file of files) {
      this.build(file);
    }
  }
 
  getApps() {
    return new Promise((resolve, reject) =>
      glob('apps/**/package.json', {}, (error, files) => {
        if (error) {
          return reject(error);
        }

        resolve(
          files.filter(file => {
            if (file.includes('node_modules')) {
              return false;
            }

            return true;
          }),
        );
      }),
    );
  }

  getCircularDependencies() {
    const result = [];

    for (const file of Object.keys(this.dependencies)) {
      for (const dependency of this.dependencies[file]) {
        if (this.dependencies[dependency].includes(file)) {
          result.push([file, dependency]);
        }
      }
    }

    return result;
  }

}

module.exports = {
  Dependencies
}