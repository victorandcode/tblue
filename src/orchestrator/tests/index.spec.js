jest.mock('../blueprints');
jest.mock('../questions');

import { solicitBlueprint } from '../blueprints';
import { askQuestions } from '../questions';
import { begin } from '../index';
import { basicBlueprint, questionGeneratedCards } from './stubs';

xdescribe('orchestrator', () => {
    xdescribe('begin', () => {
        xit('returns correct cards', async () => {
            solicitBlueprint.mockImplementation(() => basicBlueprint);
            askQuestions.mockImplementation(() => questionGeneratedCards);
            expect(await begin()).toMatchSnapshot();
        });
    });
});