// @flow
import opn from 'opn';
import inquirer from 'inquirer';

import logger from '~/common/logger';
import type { Card } from '~/templates/types';
import { create as createBoard, getLists } from '~/api/board';
import { create as createCard } from '~/api/card';
import type { Board } from '~/api/types';

import { solicitBoardName } from './board';
import { solicitQuestionnaire } from './questionnaire';
import { askQuestions } from './questions';
import { solicitUserStories } from './userStories';

export const padding = () => logger.warning('');

const getCards = async (): Promise<Array<Card>> => {
    const questionnaire = await solicitQuestionnaire();
    const questionGeneratedCards = await askQuestions(questionnaire);
    padding();
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
        logger.warning(`Created ${i+1}/${cards.length} cards`)
    }
    logger.success('All cards created!');
    return board;
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

export const begin = async () => {
    const boardName = await solicitBoardName();
    padding();
    const cards = await getCards();
    padding();
    const board = await registerData(boardName, cards);
    padding();
    await solicitOpenBoardUrl(board);
};
