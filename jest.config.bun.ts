import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/setupTests.ts', '!src/**/__tests__/**'],
  // Only run the consolidated Bun test file
  testMatch: ['<rootDir>/src/__tests__/bun-tests.test.ts'],
  // Exclude problematic modules
  modulePathIgnorePatterns: ['<rootDir>/node_modules/expo-router', '<rootDir>/node_modules/@clerk/clerk-expo'],
};

export default config;
