module.exports = {
    name: 'api-now',
    preset: '../../../jest.config.js',
    coverageDirectory: '../../../coverage/apps/api-now',
    globals: {
      'ts-jest': {
        diagnostics: false,
      },
    },
    globalSetup: '../../../test/jest/global-setup.ts',
    globalTeardown: '../../../test/jest/global-teardown.unit-test.ts',
  };
  