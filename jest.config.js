export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/**/__tests__/**/*.test.ts'],
    testPathIgnorePatterns: ['/node_modules/'],
    coverageDirectory: './coverage',
    coveragePathIgnorePatterns: ['node_modules'],
    transform: {
        '\\.tsx?$': 'ts-jest',
        '\\.jsx?$': 'babel-jest',
    },
};
