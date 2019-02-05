// @flow
import inquirer from 'inquirer';
import logger from '~/common/logger';
import templates from '../../templates';
import type { Questionnaire } from '~/types';

const questionName = 'selectedQuestionnaire';

export const solicitQuestionnaire = async (): Questionnaire => {
    logger.instructions(
        'Questionnaires contain pre-defined cards and also cards generated based on your answers');
    const answers = await inquirer
        .prompt([{
            type: 'list',
            name: questionName,
            message: 'What questionnaire would you like to use?',
            choices: templates.map(q => q.name),
            prefix: '📋',
        }]);
    return templates.find(q => q.name === answers[questionName]);
};
