jest.mock('../questionnaire');
jest.mock('../questions');

import { solicitQuestionnaire } from '../questionnaire';
import { askQuestions } from '../questions';
import { begin } from '../index';
import { basicQuestionnaire, questionGeneratedCards } from './stubs';

describe('orchestrator', () => {
    describe('begin', () => {
        it('returns correct cards', async () => {
            solicitQuestionnaire.mockImplementation(() => basicQuestionnaire);
            askQuestions.mockImplementation(() => questionGeneratedCards);
            expect(await begin()).toMatchSnapshot();
        });
    });
});