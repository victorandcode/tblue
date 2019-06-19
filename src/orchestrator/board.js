// @flow
import inquirer from 'inquirer';
import opn from 'opn';

import type { Board } from '~/api/types';

const questionBoardName = 'boardName';
const questionOpenBoardUrl = 'openBoardUrl';

export const solicitBoardName = async (): Promise<string> => {
    const answers = await inquirer.prompt([{
        name: questionBoardName,
        message: 'Please enter the board name:',
        prefix: '📝',
        validate: (value) => !!value || 'The board name can\'t be empy',
    }]);
    return answers[questionBoardName];
};

export const solicitOpenBoardUrl = async (board: Board) => {
    const answer = await inquirer
        .prompt([{
            type: 'confirm',
            name: questionOpenBoardUrl,
            message: `Board url is ${board.url}, would you like to open it?`,
        }]);
    if(answer[questionOpenBoardUrl]) {
        await opn(board.url);
    }
};