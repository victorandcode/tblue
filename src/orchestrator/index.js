// @flow
import { solicitQuestionnaire } from './questionnaire';
import { askQuestions } from './questions';

export const begin = async () => {
    const questionnaire = await solicitQuestionnaire();
    const questionGeneratedCards = await askQuestions(questionnaire);
    const result = [
        ...questionGeneratedCards,
        questionnaire.cards,
    ];
    console.log('result: ', result);
    return result;
};
