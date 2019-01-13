// @flow

import axios from 'axios';
import qs from 'qs';

import { getEnvValue, envKeys } from '~/common/env';

const createUrl = (queryParams: string) => `https://api.trello.com/1/boards/${queryParams}`;

export const create = (name: string): Promise<Object> => {
    const key = getEnvValue(envKeys.trelloApiKey);
    const token = getEnvValue(envKeys.appToken);
    const queryParams = {
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
        key,
        token,
    };
    const queryParamsStr = qs.stringify(queryParams, { addQueryPrefix: true });
    const url = createUrl(queryParamsStr)
    return axios.post(url);
};
