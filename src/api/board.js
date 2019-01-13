// @flow

import { doPost } from './wrapper';

const createUrl = (queryParams: string) => `https://api.trello.com/1/boards/${queryParams}`;

export const create = (name: string): Promise<Object> => {
    const baseParams = {
        name,
        defaultLabels: 'true',
        defaultLists: 'true',
        keepFromSource: 'none',
        prefs_permissionLevel: 'private',
        prefs_voting: 'disabled',
        prefs_comments: 'members',
        prefs_invitations: 'members',
        prefs_selfJoin: 'true',
        prefs_cardCovers: 'true',
        prefs_background: 'blue',
        prefs_cardAging: 'regular',
    };
    return doPost(baseParams, createUrl);
};
