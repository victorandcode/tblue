// @flow
import { doPost } from './wrapper';

export const getCreateUrl = (queryParams: string): string => `https://api.trello.com/1/lists${queryParams}`;

export const create = (name: string, idBoard: string): Promise<Object> => {
    const baseParams = {
        name,
        idBoard,
    };
    return doPost(baseParams, getCreateUrl);
};
