import fs from 'fs';
import { getBlueprintList, blueprintsHomeFolder } from '../blueprints';
import samples from '../blueprints/samples';
import { getBlueprintTitle } from '../blueprints/prompt';
import { getBlueprintsFromFolder} from '../blueprints/fromFolder';
import { basicBlueprint, userRegisteredBlueprint } from './stubs';

jest.mock('fs');

describe('getBlueprintList', () => {
    it('returns builtInBlueprints', () => {
        expect(getBlueprintList()).toEqual(samples);
    });
    describe('when customFolder is passed', () => {
        it('returns blueprints', () => {
            const allBlueprints = [userRegisteredBlueprint, ...samples];
            const customFolder = '/my-custom-folder/';
            const customBlueprintFileName = 'my-first-blueprint.blueprint.json';
            fs.readdirSync.mockImplementationOnce((folder) => {
                if(folder === customFolder) {
                    return [customBlueprintFileName];
                }
                return [];
            });
            fs.readFileSync.mockImplementationOnce(() => JSON.stringify(userRegisteredBlueprint));
            expect(getBlueprintList(customFolder)).toEqual(allBlueprints);
            expect(fs.readdirSync).toHaveBeenCalledWith(customFolder);
        });
    });
    xdescribe(`when blueprints exist in ${blueprintsHomeFolder}`, () => {
        it('returns blueprints', () => {

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

describe('getBlueprintsFromFolder', () => {
    it('calls fs with folder', () => {
        const customFolder = 'secretFiles';
        getBlueprintsFromFolder(customFolder);
        expect(fs.readdirSync).toHaveBeenCalledWith(customFolder);
    });
    xit('returns only files that match blueprint extension', () => {
        fs.readdirSync.mockImplementationOnce(() => ['failing.json.js', 'failing.blueprint.js', 'success.blueprint.json']);
        getBlueprintsFromFolder('');
        expect(fs.readFileSync).toHaveBeenCalledWith('success.blueprint.json');
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
