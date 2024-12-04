// jest.config.js
module.exports = {
  preset: "ts-jest", // Use ts-jest preset to handle TypeScript
  testEnvironment: "node", // Set test environment to Node.js
  collectCoverage: true, // Collect code coverage data
  coverageDirectory: "coverage", // Output directory for coverage reports
  testMatch: ["<rootDir>/tests/**/*.test.ts"], // Match test files in tests directory
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"], // Setup global configurations
};
