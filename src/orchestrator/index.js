// @flow
import { solicitQuestionnaire } from './questionnaire';
import { askQuestions } from './questions';

export const begin = async () => {
    const questionnaire = await solicitQuestionnaire();
    const questionGeneratedCards = await askQuestions(questionnaire);
    return [
        ...questionGeneratedCards,
        questionnaire.cards,
    ];
};
