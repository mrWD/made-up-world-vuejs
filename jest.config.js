module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  coverageReporters: [
    'html',
    'text-summary',
    'lcov',
  ],
  collectCoverageFrom: [
    '**/*.{js,vue,ts}',
    '!**/node_modules/**',
    '!src/main.ts',
    '!src/App.vue',
    '!src/**/*.d.*',
  ],
  coverageDirectory: '<rootDir>/tests/unit/coverage/',
  coveragePathIgnorePatterns: [
    '<rootDir>/api-server.js',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/constants/',
    '<rootDir>/.+\\.config\\.js$',
    '<rootDir>/tests/',
    '<rootDir>/src/router.ts',
    '<rootDir>/src/main.ts',
    '<rootDir>/src/helpers/icons/',
    '<rootDir>/src/pages/',
    '<rootDir>/src/App.vue',
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
    'ts',
    'tsx',
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
