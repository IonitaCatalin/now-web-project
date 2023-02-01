(async () => {
    const { Dependencies } = require('./util/dependencies'),
      { readFileSync, writeFileSync } = require('fs'),
      dependencies = new Dependencies(),
      appPackageJson = process.argv[2],
      appDockerFile = `${appPackageJson}`.replace('/package.json', '/Dockerfile'),
      appFolder = `${appPackageJson}`.replace('/package.json', '');
  
    dependencies.build(appPackageJson);
    const libraries = Object.keys(dependencies.dependencies)
      .map(lib => lib.replace('/package.json', ''))
      .filter(lib => !lib.includes('apps/'))
      .sort()
      .reverse();
  
    const dockerFile = readFileSync(appDockerFile, 'utf-8')
        .split('\n')
        // Make sure we remove existing entries of libs
        .filter(line => !(line.includes('COPY') && line.includes('/app/libs'))),
      dockerIndex = dockerFile.findIndex(line => line.includes('COPY --from=builder'));
  
    // Forcing only the libs which are used
    for (const lib of libraries) {
      dockerFile.splice(dockerIndex, 0, `COPY --from=builder /app/${lib} /app/${lib}/`);
    }
  
    // Replace the sed command
    const dockerSedIndex = dockerFile.findIndex(line => line.includes('RUN sed'));
    console.log(dockerSedIndex);
    if (dockerSedIndex >= 0) {
      const appSed = [...libraries.reverse(), appFolder].map(app => `"${app.replace(/\//g, '\\/')}"`).join(',\\n\\t\\t').replace(/_([^_]*)$/, ''),

        sed = `RUN sed -i '/\"libs\\//d' /app/package.json && sed -i 's/"apps\\/\\**"/${appSed}/g' /app/package.json`;
      dockerFile.splice(dockerSedIndex, 1, sed);
    }
  
    writeFileSync(appDockerFile, dockerFile.join('\n'), 'utf-8');
  })().catch(console.error);