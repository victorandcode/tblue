// @flow
import { solicitQuestionnaire } from './questionnaire';
import { askQuestions } from './questions';
import { solicitUserStories } from './userStories';

export const begin = async () => {
    const questionnaire = await solicitQuestionnaire();
    const questionGeneratedCards = await askQuestions(questionnaire);
    const userStoryCards = await solicitUserStories();
    return [
        ...questionGeneratedCards,
        ...questionnaire.cards,
        ...userStoryCards,
    ];
};
