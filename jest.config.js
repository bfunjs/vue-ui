module.exports = {
    preset: 'ts-jest',
    verbose: true,
    testEnvironment: 'node',
    roots: [
        '<rootDir>/__tests__'
    ],
    testRegex: '__tests__/(.+)\\.[jt]s$',
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
