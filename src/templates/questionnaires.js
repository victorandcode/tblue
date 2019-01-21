// @flow
import fs from 'fs';
import type { Questionnaire } from './types';

const questionnairesPath = `${__dirname}/../../templates/`;

const fileToJson = (fileName: string): Object => {
    const filePath = `${questionnairesPath}${fileName}`;
    const contentsRaw = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const contentsParsed = JSON.parse(contentsRaw);
    return {
        name: fileName,
        ...contentsParsed,
    };
};

export const loadQuestionnaires = (): Array<Questionnaire> => {
    const files = fs.readdirSync(questionnairesPath);
    return files.map(fileToJson);
};
