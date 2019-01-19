// @flow
import { doGet, doPost } from './wrapper';
import type { Board, List } from './types';

const createUrl = (queryParams: string) => `https://api.trello.com/1/boards/${queryParams}`;

export const create = async (name: string): Board => {
    const baseParams = {
        name,
        defaultLabels: 'true',
        defaultLists: 'true',
    };
    const response = await doPost(baseParams, createUrl);
    return response.data;
};

const getListsUrl = (boardId: string, queryParams: string) => `https://trello.com/1/boards/${boardId}/lists${queryParams}`;

export const getLists = async (boardId: string): Promise<Array<List>> => {
    const getUrlFn = (queryParams: string) => getListsUrl(boardId, queryParams);
    const response = await doGet({}, getUrlFn);
    return response.data;
};
