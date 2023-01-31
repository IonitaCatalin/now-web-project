module.exports = {
    verbose: false,
    resetMocks: true,
    restoreMocks: true,
  
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|js)$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    moduleNameMapper: {
      // Jest wires `fs` to `graceful-fs`, which causes a memory leak when
      // `graceful-fs` does `require('fs')`.
      // Ref: https://github.com/facebook/jest/issues/2179#issuecomment-355231418
      'graceful-fs': '<rootDir>/test/jest/helpers/fs.js',
  
      // Jest resolver for the local libs
      '@now/(.*)': '<rootDir>/libs/$1/src',
    },
    testEnvironment: 'node',
    globals: {
      'ts-jest': {
        diagnostics: false,
        tsconfig: 'tsconfig.spec.json',
      },
    },
    setupFilesAfterEnv: ['jest-extended/all', './test/jest/helpers/matchers.ts'],
    testSequencer: './test/jest/helpers/sequencer.js',
  };
  