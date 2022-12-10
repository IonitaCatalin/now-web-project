const {
    exec
  } = require('child_process');
  
  class ProcessRunner {
    constructor(type, command, logs) {
      this.type = type,
      this.command = command
      this.logs = logs
    }
  
    async execute(dependencies) {
      let iteration = 0;
      let errors = false;
  
      const packs = {};
      const runHr = process.hrtime();
  
      do {
        const next = Object.keys(dependencies).filter(
          pack => typeof packs[pack] === 'undefined' && dependencies[pack].every(dependency => typeof packs[dependency] !== 'undefined'),
        );

        if (!next.length) {
          break;
        }
  
        console.log(`${this.type} workspace iteration ${iteration} - ${next.length} with ${this.command}`);
        const iterationHr = process.hrtime();
  
        try {
          await Promise.all(
            next.map(async file => {
  
              delete dependencies[file]
  
              const packHr = process.hrtime();
  
              const {
                stdout,
                stderr
              } = await this.run(file);
  
              errors = errors || !stderr
  
              const time = process.hrtime(packHr),
                s = time[0],
                ms = Math.round(time[1] / 1000) / 100,
                used = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024);
  
              packs[file] = 1;
  
              console.log(` - ${file}: ${s}s ${ms}ms (${used} MB)`);
  
              if (this.logs) {
                console.log(stdout)
              }

              if (stderr) {
                console.log(stdout);
                console.log(stderr);
              }
            })
          )
        } catch (err) {
          console.log(err);
          errors = true
        }
  
        const time = process.hrtime(iterationHr),
          s = time[0],
          ms = Math.round(time[1] / 10000) / 100,
          used = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024);
  
        console.log(`${this.type} iteration stats: ${s}s ${ms}ms (${used} MB)`);
  
        iteration++;
  
      } while (true);
  
      const time = process.hrtime(runHr),
        s = time[0],
        ms = Math.round(time[1] / 10000) / 100,
        used = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024);
  
      console.log(`Time: ${s}s ${ms}ms (${used} MB)`);
  
      return errors;
    }
  
    run(file) {
      return new Promise(resolve => {
        const workspace = file.replace('/package.json', '');
        exec(`npm run ${this.command} --workspace=${workspace} --if-present`, (_, stdout, stderr) => {
          resolve({
            stdout,
            stderr
          });
        });
      });
    }
  }
  
  module.exports = {
    ProcessRunner
  }