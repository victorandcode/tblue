// @flow
import inquirer from 'inquirer';

import logger from '~/common/logger';
import type { Card } from '~/types';

export const questionName = 'userStorySummary';

const isAnswerToStop = (userStorySummary: string): boolean =>
    userStorySummary === 'q' || userStorySummary === '';

export const solicitUserStories = async (unitOfWork: string): Promise<Array<Card>> => {
    logger.instructions(
        `Enter zero or more ${unitOfWork} descriptions. If you want to stop just enter an empty description or enter q as a description`);
    const result = [];
    let counter = 1;
    while(true) {
        const answers = await inquirer.prompt([{
            type: 'input',
            name: questionName,
            message: `Please enter the description for ${unitOfWork} ${counter}:`,
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
