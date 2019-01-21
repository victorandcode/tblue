// @flow
import inquirer from 'inquirer';

import logger from '~/common/logger';
import type { Card } from '~/templates/types';

export const questionName = 'userStorySummary';

const isAnswerToStop = (userStorySummary: string) =>
    userStorySummary === 'q' || userStorySummary === '';

export const solicitUserStories = async (): Promise<Array<Card>> => {
    logger.instructions(
        '▶ Please start adding user stories. If you want to stop just enter an empty summary or just use q as a description');
    const result = [];
    let counter = 1;
    while(true) {
        const answers = await inquirer.prompt([{
            type: 'input',
            name: questionName,
            message: `Please enter the user story ${counter} description`,
        }]);
        const userStorySummary = answers[questionName];
        if(isAnswerToStop(userStorySummary)) {
            break;
        }
        result.push({ name: userStorySummary });
        counter++;
    }
    return result;
};
