jest.mock('../questionnaire');
jest.mock('../questions');

import { solicitQuestionnaire } from '../questionnaire';
import { askQuestions } from '../questions';
import { begin } from '../index';
import { basicQuestionnaire, questionGeneratedCards } from './stubs';

xdescribe('orchestrator', () => {
    xdescribe('begin', () => {
        xit('returns correct cards', async () => {
            solicitQuestionnaire.mockImplementation(() => basicQuestionnaire);
            askQuestions.mockImplementation(() => questionGeneratedCards);
            expect(await begin()).toMatchSnapshot();
        });
    });
});