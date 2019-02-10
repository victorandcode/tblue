// @flow
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import * as yup from 'yup';

import logger from '~/common/logger';
import { builtInTemplates } from '~/templates';
import type { Questionnaire } from '~/types';

const questionName = 'selectedQuestionnaire';

const schema = yup.object().shape({
    name: yup.string().required(),
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

export const matchesQuestionnaireFormat = (candidateQuestionnaire: Object): boolean =>
    schema.isValidSync(candidateQuestionnaire);

const fileToJson = (fileName: string, fileFolder: string): Object => {
    const filePath = path.join(fileFolder, fileName);
    const contentsRaw = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return JSON.parse(contentsRaw);
};

export const getQuestionnaireList = (customQuestionnairesPath: ?string) => {
    let questionnaires = builtInTemplates;
    if(customQuestionnairesPath) {
        const files = fs.readdirSync(customQuestionnairesPath);
        const jsonFileNames = files.filter(file => file.endsWith('.json'));
        const candidateCustomQuestionnaires = jsonFileNames.map(
            // $FlowFixMe
            jsonFileName => fileToJson(jsonFileName, customQuestionnairesPath)
        );
        const customQuestionnaires = candidateCustomQuestionnaires;
        questionnaires = [...customQuestionnaires, ...questionnaires];
    }
    return questionnaires.filter(matchesQuestionnaireFormat);
};

export const solicitQuestionnaire = async (customTemplatesFolder: ?string): Questionnaire => {
    const questionnaires = getQuestionnaireList(customTemplatesFolder);
    logger.instructions(
        'Questionnaires contain pre-defined cards and also cards generated based on your answers');
    const answers = await inquirer
        .prompt([{
            type: 'list',
            name: questionName,
            message: 'What questionnaire would you like to use?',
            choices: questionnaires.map(q => q.name),
            prefix: '📋',
        }]);
    return questionnaires.find(q => q.name === answers[questionName]);
};
