// @flow
import inquirer from 'inquirer';
import opn from 'opn';

import type { Board } from '~/api/types';

const questionName = 'boardName';

export const solicitBoardName = async (): Promise<string> => {
    const answers = await inquirer.prompt([{
        name: questionName,
        message: 'Please enter the board name:',
        prefix: '📝'
    }]);
    return answers[questionName];
};

export const solicitOpenBoardUrl = async (board: Board) => {
    const questionName = 'openBoardUrl';
    const answer = await inquirer
        .prompt([{
            type: 'confirm',
            name: questionName,
            message: `Board url is ${board.url}, would you like to open it?`,
        }])
    if(answer[questionName]) {
        opn(board.url);
    }
};