import inquirer from 'inquirer';

import type { Card, Blueprint } from '~/types';

export const askQuestions = async (blueprint: Blueprint): Array<Card> => {
    const { questions } = blueprint;
    const promptQuestions = questions.map(
        question => ({
            type: 'confirm',
            name: question.content,
            message: question.content,
        })
    );
    const answers = await inquirer.prompt(promptQuestions);
    return questions
        .filter(question => answers[question.content])
        .map(question => question.cardToGenerate);
};
