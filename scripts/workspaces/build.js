(async () => {
    const { Dependencies } = require('./util/dependencies'),
      { ProcessRunner } = require('./util/process-runner');
  
    const dependencies = new Dependencies(),
      builder = new ProcessRunner('Build', 'build', false);
  
    await dependencies.all();

  
    const circularDependencies = dependencies.getCircularDependencies();
    if (circularDependencies.length > 0) {
      circularDependencies.forEach(([packFile, dependency]) => {
        console.log(`Potential circular dependency detected between ${packFile} and ${dependency}`);
      });
  
      process.exit(1);
    }
  
    if (await builder.execute(dependencies.dependencies)) {
      process.exit(1);
    }

    process.exit(0);
    
  })().catch(console.error);
  