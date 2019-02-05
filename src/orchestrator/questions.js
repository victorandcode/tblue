import inquirer from 'inquirer';

import type { Card, Questionnaire } from '~/types';

export const askQuestions = async (questionnaire: Questionnaire): Array<Card> => {
    const questions = questionnaire.questions;
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
