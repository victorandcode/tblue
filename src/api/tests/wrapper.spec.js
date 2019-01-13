import { getQueryParams } from '../wrapper';

jest.mock('../../common/env', () => ({
    getTrelloApiKey: () => '<TrelloApiKey>',
    getAppToken: () => '<AppToken>',
}));

describe('getQueryParams', () => {
    it('converts params to string correctly', () => {
        const baseOptions = {
            name: "John Francis 213",
            surname: "Doe",
        };
        expect(getQueryParams(baseOptions)).toMatchSnapshot();
    });
});
