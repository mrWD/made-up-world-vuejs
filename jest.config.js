module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  coverageReporters: [
    'html',
    'text-summary',
    'lcov',
  ],
  collectCoverageFrom: [
    '**/*.{js,vue,ts}',
    '!**/node_modules/**',
  ],
  coverageDirectory: '<rootDir>/tests/unit/coverage/',
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/.+\\.config\\.js$',
    '<rootDir>/tests/',
    '<rootDir>/src/constants/',
    '<rootDir>/src/helpers/icons/',
    '<rootDir>/src/router/',
    '<rootDir>/src/store/index.ts',
    '<rootDir>/src/views/',
    '<rootDir>/src/App.vue',
    '<rootDir>/src/main.ts',
    '<rootDir>/src/registerServiceWorker.ts',
    '<rootDir>/src/service-worker.js',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
    'ts',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
    'vue-jest': {
      pug: {
        doctype: 'html',
      },
    },
  },
};
