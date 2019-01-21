jest.mock('inquirer');

import inquirer from 'inquirer';
import { solicitUserStories } from '../userStories';

describe('userStories', () => {
    describe('when user adds 1 story', () => {
        it('generates corresponding card', async () => {
            inquirer.prompt.mockImplementation(() => Promise.resolve({
                questionName: 'Search for products',
            }));
            const [card] = await solicitUserStories();
            expect(card).toEqual({
                'name': 'Search for products',
            });
        });
    });
});
