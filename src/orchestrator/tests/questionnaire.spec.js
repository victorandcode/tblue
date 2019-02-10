import * as templates from '~/templates';
import { getQuestionnaireList } from '../questionnaire';
import { basicQuestionnaire, userRegisteredQuestionnaire } from './stubs';
import fs from 'fs';

jest.mock('fs');
jest.mock('path');
jest.mock('../../templates/index.js');

describe('getQuestionnaireList', () => {
    it('returns builtInTemplates', () => {
        const questionnaires = [basicQuestionnaire];
        templates.builtInTemplates = questionnaires;
        expect(getQuestionnaireList()).toEqual(questionnaires);
    });
    describe('when customFolder is passed', () => {
        it('returns builtInTemplates and custom templates', () => {
            const allQuestionnaires = [userRegisteredQuestionnaire, basicQuestionnaire];
            const customFolder = '/my-custom-folder/';
            const customTemplateFileName = 'my-first-template.json';
            fs.readdirSync.mockImplementation(() => [customTemplateFileName]);
            fs.readFileSync.mockImplementation(() => JSON.stringify(userRegisteredQuestionnaire));
            expect(getQuestionnaireList(customFolder)).toEqual(allQuestionnaires);
            expect(fs.readdirSync).toHaveBeenCalledWith(customFolder);
        });
    });
});

// describe('matchesQuestionnaireFormat', () => {
//     it('returns true for valid questionnaire', () => {
//         expect(matchesQuestionnaireFormat(basicQuestionnaire)).toEqual(true);
//     });

//     it('returns false for invalid questionnaire', () => {
//         const questionnaireBadQuestionnaire = {
//             name: 'My first template'
//             questionnaire: [
//                 {
//                     'content': 'Will you run this in Amazon S3?',
//                 },
//             ],
//             [
//                 'Configure development environment',
//                 'Install jQuery',
//                 'Setup HTML5 boilerplate',
//                 'Configure CI',
//             ]
//         };
//         expect(matchesQuestionnaireFormat(questionnaire)).toEqual(false);
//     });
// });