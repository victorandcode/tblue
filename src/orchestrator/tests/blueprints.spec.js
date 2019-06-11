import * as blueprintTemplates from '~/blueprints';
import { getBlueprintList, getBlueprintTitle } from '../blueprints';
import { basicBlueprint, userRegisteredBlueprint } from './stubs';
import fs from 'fs';

jest.mock('fs');
jest.mock('path');
jest.mock('../../blueprints/index.js');

describe('getBlueprintList', () => {
    it('returns builtInBlueprints', () => {
        const blueprints = [basicBlueprint];
        blueprintTemplates.builtInBlueprints = blueprints;
        expect(getBlueprintList()).toEqual(blueprints);
    });
    describe('when customFolder is passed', () => {
        it('returns builtInBlueprints and custom blueprints', () => {
            const allBlueprints = [userRegisteredBlueprint, basicBlueprint];
            const customFolder = '/my-custom-folder/';
            const customBlueprintFileName = 'my-first-blueprint.json';
            fs.readdirSync.mockImplementation(() => [customBlueprintFileName]);
            fs.readFileSync.mockImplementation(() => JSON.stringify(userRegisteredBlueprint));
            expect(getBlueprintList(customFolder)).toEqual(allBlueprints);
            expect(fs.readdirSync).toHaveBeenCalledWith(customFolder);
        });
    });
});

describe('getBlueprintTitle', () => {
    it('includes card count and number of questions', () => {
        const title = getBlueprintTitle(basicBlueprint);
        expect(title).toMatch(`${basicBlueprint.cards.length} built-in cards`);
        expect(title).toMatch(`${basicBlueprint.questions.length} questions`);
    });
});
// describe('matchesBlueprintFormat', () => {
//     it('returns true for valid blueprint', () => {
//         expect(matchesBlueprintFormat(basicBlueprint)).toEqual(true);
//     });

//     it('returns false for invalid blueprint', () => {
//         const blueprintBadBlueprint = {
//             name: 'My first blueprint'
//             blueprint: [
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
//         expect(matchesBlueprintFormat(blueprint)).toEqual(false);
//     });
// });
