// jest.config.js — dual project config:
// • "node" environment for API route tests (needs fetch/Request/Response globals)
// • "jsdom" environment for React component tests (needs DOM APIs)

/** @type {import('jest').Config} */
module.exports = {
  projects: [
    {
      // ── API / Server tests ──────────────────────────────────────────────
      displayName: 'api',
      testEnvironment: 'node',
      testMatch: [
        '**/tests/**/*.test.ts',
        '**/__tests__/**/*.test.ts',
      ],
      transform: { '^.+\\.tsx?$': 'ts-jest' },
      moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
      moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
      setupFiles: ['<rootDir>/jest.setup.node.js'],
    },
    {
      // ── React / UI component tests ──────────────────────────────────────
      displayName: 'ui',
      testEnvironment: 'jsdom',
      testMatch: [
        '**/__tests__/components/**/*.test.tsx',
        '**/tests/components/**/*.test.tsx',
      ],
      transform: { '^.+\\.tsx?$': 'ts-jest' },
      moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
      moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
      setupFiles: ['<rootDir>/jest.setup.js'],
    },
  ],
};
