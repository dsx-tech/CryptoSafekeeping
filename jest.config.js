module.exports = {
    globals: {
      __DEV__: true,
    },
    verbose: false, // false since we want to see console.logs inside tests
    bail: false,
    testURL: 'http://localhost/',
    testEnvironment: 'jsdom',
    testRegex: './__unit__/.*.js$',
    rootDir: '.',
    testPathIgnorePatterns: [
      '<rootDir>/components/coverage/',
      '<rootDir>/test/cypress/',
      '<rootDir>/test/coverage/',
      '<rootDir>/dist/',
      '<rootDir>/node_modules/',
    ],
    moduleFileExtensions: ['js', 'json', 'vue'],
    moduleNameMapper: {
      '^vue$': 'vue/dist/vue.common.js',
      'quasar': 'quasar-framework/dist/umd/quasar.mat.umd.js',
    },
    resolver: null,
    transformIgnorePatterns: [
      'node_modules/core-js',
      'node_modules/babel-runtime',
      'node_modules/vue',
      'node_modules/'
    ],
    transform: {
      '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
      '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    },
  }