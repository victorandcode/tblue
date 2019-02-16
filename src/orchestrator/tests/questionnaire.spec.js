import * as blueprints from '~/blueprints';
import { getQuestionnaireList } from '../questionnaire';
import { basicQuestionnaire, userRegisteredQuestionnaire } from './stubs';
import fs from 'fs';

jest.mock('fs');
jest.mock('path');
jest.mock('../../blueprints/index.js');

describe('getQuestionnaireList', () => {
    it('returns builtInBlueprints', () => {
        const questionnaires = [basicQuestionnaire];
        blueprints.builtInBlueprints = questionnaires;
        expect(getQuestionnaireList()).toEqual(questionnaires);
    });
    describe('when customFolder is passed', () => {
        it('returns builtInBlueprints and custom blueprints', () => {
            const allQuestionnaires = [userRegisteredQuestionnaire, basicQuestionnaire];
            const customFolder = '/my-custom-folder/';
            const customBlueprintFileName = 'my-first-blueprint.json';
            fs.readdirSync.mockImplementation(() => [customBlueprintFileName]);
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