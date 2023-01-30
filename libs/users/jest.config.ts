module.exports = {
    name: 'daemon-sync',
    preset: '../../../jest.config.js',
    coverageDirectory: '../../../coverage/apps/daemon-sync',
    globals: {
      'ts-jest': {
        diagnostics: false,
      },
    },
    globalSetup: '../../../test/jest/global-setup.ts',
    globalTeardown: '../../../test/jest/global-teardown.unit-test.ts',
  };
  