// @flow
import logger from '~/common/logger';
import type { Card } from '~/types';
import packageJson from '../../package.json';
import { create as createBoard, getLists } from '~/api/board';
import { create as createCard } from '~/api/card';
import { solicitBoardName, solicitOpenBoardUrl } from './board';
import { gatherBlueprints } from './blueprints';
import { askQuestions } from './questions';
import { solicitUserStories } from './userStories';

export const padding = () => logger.warning('');

const getCards = async (customBlueprintsFolder: ?string): Promise<Array<Card>> => {
    const blueprint = await gatherBlueprints(customBlueprintsFolder);
    const questionGeneratedCards = await askQuestions(blueprint);
    padding();
    const userStoryCards = await solicitUserStories(blueprint.unitOfWork);
    return [
        ...blueprint.cards,
        ...questionGeneratedCards,
        ...userStoryCards,
    ];
};

const registerData = async (boardName: string, cards: Array<Card>) => {
    const board = await createBoard(boardName);
    logger.success('✔️ Board created!');
    const boardLists = await getLists(board.id);
    const listId = boardLists[0].id;
    for(let i = 0; i < cards.length; i++) {
        const card = cards[i];
        await createCard(card.name, listId);
        logger.warning(`Created ${i+1}/${cards.length} cards`);
    }
    logger.success('✔️ All cards created!');
    return board;
};

export const begin = async (customBlueprintsFolder: ?string) => {
    const boardName = await solicitBoardName();
    padding();
    const cards = await getCards(customBlueprintsFolder);
    padding();
    const board = await registerData(boardName, cards);
    padding();
    await solicitOpenBoardUrl(board);
    padding();
    logger.success(`💜 Thanks for using ${packageJson.name}`);
};
