// @flow
/**
 * The functions in this file assume that you are using the trello API which
 * receives the key and token as query params
 */

import axios from 'axios';
import qs from 'qs';

import { getTrelloApiKey, getAppToken } from '~/common/env';

export const getQueryParams = (baseParams: Object): string => {
    const key = getTrelloApiKey();
    const token = getAppToken();
    const fullParams = {
        ...baseParams,
        key,
        token,
    };
    return qs.stringify(fullParams, { addQueryPrefix: true });
};

export const doPost = (baseParams: Object, getUrl: (queryParams: string) => string) => {
    const queryParams = getQueryParams(baseParams);
    return axios.post(getUrl(queryParams));
};

export const doGet = (baseParams: Object, getUrl: (queryParams: string) => string) => {
    const queryParams = getQueryParams(baseParams);
    return axios.get(getUrl(queryParams));
};