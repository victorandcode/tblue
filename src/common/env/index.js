// @flow
import dotenv from 'dotenv';

dotenv.config();

export const envKeys = {
    trelloApiKey: 'TRELLO_API_KEY',
    appToken: 'APP_TOKEN',
};

export const getEnvValue = (key: string) => process.env[key];

export default {
    getTrelloApiKey: () => getEnvValue(envKeys.trelloApiKey),
    getAppToken: () => getEnvValue(envKeys.appToken)
};
