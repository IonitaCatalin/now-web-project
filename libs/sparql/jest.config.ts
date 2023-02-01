module.exports = {
    name: 'lib-sparql',
    preset: '../../../jest.config.js',
    coverageDirectory: '../../../coverage/apps/lib-sparql',
    globals: {
      'ts-jest': {
        diagnostics: false,
      },
    },
    globalSetup: '../../../test/jest/global-setup.ts',
    globalTeardown: '../../../test/jest/global-teardown.unit-test.ts',
  };
  