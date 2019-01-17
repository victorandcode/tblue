// @flow

import fs from 'fs';

const questionnairesPath = `${__dirname}/../../templates/`;

export type Card = {
    name: string,
    description?: string,
};

export type Question = {
    content: string,
    cardToGenerate: Card,
};

export type Questionnaire = {
    questions: Array<Question>,
    cards: Array<Card>
};

const fileToJson = (fileName: string): Object => {
    const filePath = `${questionnairesPath}${fileName}`;
    const contents = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return JSON.parse(contents);
};

export const loadQuestionaires = (): Array<Questionnaire> => {
    const files = fs.readdirSync(questionnairesPath);
    return files.map(fileToJson);
};
