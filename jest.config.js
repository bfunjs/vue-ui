module.exports = {
    verbose: true,
    testEnvironment: 'node',
    roots: [
        '<rootDir>/__tests__'
    ],
    testRegex: '__tests__/(.+)\\.js$',
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
