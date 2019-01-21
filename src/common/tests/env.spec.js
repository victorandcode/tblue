import { envKeys, validateEnvironment } from '../env';

describe('validateEnvironment', () => {
    describe('when env key is missing', () => {
        it('throws an error', () => {
            process.env = {
                [envKeys.trelloApiKey]: undefined
            };
            expect(() => {
                validateEnvironment();
            }).toThrow();
        });
    });
    describe('when all env keys have values', () => {
        it('doesn\'t throw', () => {
            const env = Object
                .keys(envKeys)
                .reduce((accumulator, currentValue) => ({
                    ...accumulator,
                    [envKeys[currentValue]]: 'dummy value'
                }), {});
            process.env = env;
            console.log('env: ', env);
            expect(() => {
                validateEnvironment();
            }).not.toThrow();
        });
    });
});