
// @flow
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import * as yup from 'yup';

import logger from '~/common/logger';
import { builtInBlueprints } from '~/blueprints';
import type { Blueprint } from '~/types';

const questionName = 'selectedBlueprint';

const schema = yup.object().shape({
    name: yup.string().required(),
    unitOfWork: yup.string().required(),
    questions: yup.array().of(yup.object().shape({
        content: yup.string().required(),
        cardToGenerate: yup.object().shape({
            name: yup.string().required(),
        }),
    })),
    cards: yup.array().of(yup.object().shape({
        name: yup.string().required(),
    })),
});

export const matchesBlueprintFormat = (candidateBlueprint: Object): boolean =>
    schema.isValidSync(candidateBlueprint);

const fileToJson = (fileName: string, fileFolder: string): Object => {
    const filePath = path.join(fileFolder, fileName);
    const contentsRaw = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return JSON.parse(contentsRaw);
};

const getCustomBlueprints = (customBlueprintsPath: string) => {
    try {
        const files = fs.readdirSync(customBlueprintsPath);
        const jsonFileNames = files.filter(file => file.endsWith('.json'));
        const candidateCustomBlueprints = jsonFileNames.map(
            // $FlowFixMe
            jsonFileName => fileToJson(jsonFileName, customBlueprintsPath)
        );
        const customBlueprints = candidateCustomBlueprints;
        return customBlueprints;
    } catch (ex) {
        logger.warning('Not able to read custom blueprint folder');
    }
    return [];
};

export const getBlueprintList = (customBlueprintsPath: ?string) => {
    let blueprints = builtInBlueprints;
    if(customBlueprintsPath) {
        blueprints = [...getCustomBlueprints(customBlueprintsPath), ...blueprints];
    }
    //    blueprints = [...getHomeBlueprints(), ...blueprints];
    return blueprints.filter(matchesBlueprintFormat);
};

export const getBlueprintTitle = (blueprint: Blueprint) =>
    `${blueprint.name} (${blueprint.cards.length} built-in cards, ${blueprint.questions.length} questions)`;

export const solicitBlueprint = async (customBlueprintsFolder: ?string): Blueprint => {
    const blueprints = getBlueprintList(customBlueprintsFolder);
    logger.instructions(
        'Blueprints contain pre-defined cards and also cards generated based on your answers');
    const answers = await inquirer
        .prompt([{
            type: 'list',
            name: questionName,
            message: 'What blueprint would you like to use?',
            choices: blueprints.map(blueprint => ({
                name: getBlueprintTitle(blueprint),
                value: blueprint.name,
            })),
            prefix: '📋',
        }]);
    return blueprints.find(q => q.name === answers[questionName]);
};
