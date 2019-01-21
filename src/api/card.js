// @flow
import { doPost } from './wrapper';

const createUrl = (queryParams: string) => `https://api.trello.com/1/cards${queryParams}`;

export const create = async (name: string, idList: string): Promise<number> => {
    const baseParams = {
        name,
        idList,
    };
    const response = await doPost(baseParams, createUrl);
    return response.data.id;
};
