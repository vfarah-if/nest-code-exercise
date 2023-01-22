import type { Config } from 'jest'

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s', '!main.ts', '!**/*.module.ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/coverage',
    '<rootDir>/dist',
    '<rootDir>/generated-docs',
    '<rootDir>/templates/generated-docs',
    '<rootDir>/infrastructure',
    '.schema.ts',
    '.index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  setupFiles: ['../setup.tests.ts'],
}
export default config
