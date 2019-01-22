// @flow
import inquirer from 'inquirer';
import { loadQuestionnaires } from '~/templates/questionnaires';
import type { Questionnaire } from '~/templates/types';

const questionName = 'selectedQuestionnaire';

export const solicitQuestionnaire = async (): Questionnaire => {
    const questionnaires = loadQuestionnaires();
    const answers = await inquirer
        .prompt([{
            type: 'list',
            name: questionName,
            message: 'What questionnaire would you like to use?',
            choices: questionnaires.map(q => q.name),
            prefix: '📋'
        }]);
    return questionnaires.find(q => q.name === answers[questionName]);
};
