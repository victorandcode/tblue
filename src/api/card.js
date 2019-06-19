// @flow
import { doPost } from './wrapper';

const createUrl = (queryParams: string) => `https://api.trello.com/1/cards${queryParams}`;

export const create = async (name: string, idList: string): Promise<number> => {
    const response = await doPost({
        name,
        idList,
    }, createUrl);
    return response.data.id;
};
