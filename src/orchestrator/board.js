// @flow
import inquirer from 'inquirer';

const questionName = 'boardName';

export const solicitBoardName = async (): Promise<string> => {
    const answers = await inquirer.prompt([{
        name: questionName,
        message: 'Please enter the board name'
    }]);
    return answers[questionName];
};