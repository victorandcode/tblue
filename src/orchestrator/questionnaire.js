// @flow
import inquirer from 'inquirer';
import logger from '~/common/logger';
import { loadQuestionnaires } from '~/templates/questionnaires';
import type { Questionnaire } from '~/templates/types';

const questionName = 'selectedQuestionnaire';

export const solicitQuestionnaire = async (): Questionnaire => {
    const questionnaires = loadQuestionnaires();
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
