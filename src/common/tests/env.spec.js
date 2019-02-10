import opn from 'opn';
import inquirer from 'inquirer'; // eslint-disable-line no-unused-vars
import * as envModule from '../env';
import { envKeys, validateEnvironment, alertAndOpenUrl } from '../env';


jest.mock('opn');
jest.mock('../logger');
jest.mock('../stdin');

jest.mock('inquirer', () => {
    prompt: async () => jest.fn();
});

xdescribe('alertAndOpenUrl', () => {
    it('opens url and stops process', async () => {
        jest.spyOn(process, 'exit').mockImplementation(() => {});
        process.env = {
            [envKeys.trelloApiKey]: undefined,
        };
        await alertAndOpenUrl();
        expect(opn).toHaveBeenCalled();
        expect(process.exit).toHaveBeenCalled();
    });
});

describe('validateEnvironment', () => {
    describe('when all env keys have values', () => {
        xit('doesn\'t call alertAndOpenUrl', async () => {
            const alertAndOpenSpy = jest.spyOn(envModule, 'alertAndOpenUrl');
            const env = Object
                .keys(envKeys)
                .reduce((accumulator, currentValue) => ({
                    ...accumulator,
                    [envKeys[currentValue]]: 'dummy value',
                }), {});
            process.env = env;
            await validateEnvironment();
            expect(alertAndOpenSpy).not.toHaveBeenCalled();
        });
    });
    describe('when at least one env key doesn\'t have a value', () => {
        xit('calls alertAndOpenUrl', async () => {
            envModule.alertAndOpenUrl = jest.fn();
            process.env = {};
            await envModule.validateEnvironment();
            expect(envModule.alertAndOpenUrl).toHaveBeenCalled();
        });
    });
});
