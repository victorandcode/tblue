// @flow
import dotenv from 'dotenv';

dotenv.config();

export const envKeys = {
    trelloApiKey: 'TRELLO_API_KEY',
    appToken: 'APP_TOKEN',
};

export const getEnvValue = (key: string) => process.env[key];

export const validateEnvironment = () => {
    Object.keys(envKeys).forEach(key => {
        if(process.env[key] === undefined) {
            throw new Error(`Environment validation failed, key ${key} not found. Please check your .env file`);
        }
    });
};

export default {
    getTrelloApiKey: () => getEnvValue(envKeys.trelloApiKey),
    getAppToken: () => getEnvValue(envKeys.appToken)
};
