// @flow
import logger from '~/common/logger';

import { create as createBoard, getLists } from '~/api/board';
import { create as createCard } from '~/api/card';

import { solicitBoardName } from './board';
import { solicitQuestionnaire } from './questionnaire';
import { askQuestions } from './questions';
import { solicitUserStories } from './userStories';

const getCards = async () => {
    const questionnaire = await solicitQuestionnaire();
    const questionGeneratedCards = await askQuestions(questionnaire);
    const userStoryCards = await solicitUserStories();
    return [
        ...questionGeneratedCards,
        ...questionnaire.cards,
        ...userStoryCards,
    ];
}

const registerData = async (boardName: string, cards: Array<Card>) => {
    const board = await createBoard(boardName);
    logger.success('Board created!');
    const boardLists = await getLists(board.id);
    const listId = boardLists[0].id;
    for(let i = 0; i < cards.length; i++) {
        const card = cards[i];
        await createCard(card.name, listId);
        logger.info(`Created ${i+1}/${cards.length} cards`)
    }
    logger.success('All cards created!');
};

export const begin = async () => {
    const boardName = await solicitBoardName();
    const cards = await getCards();
    await registerData(boardName, cards);
};
