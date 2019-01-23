// @flow
export const envKeys = {
    trelloApiKey: 'TRELLO_API_KEY',
    appToken: 'APP_TOKEN',
};

export const getEnvValue = (key: string) => process.env[key];

export const validateEnvironment = () => {
    Object.keys(envKeys).forEach(key => {
        const envValue = envKeys[key];
        if(process.env[envValue] === undefined) {
            throw new Error(`Environment validation failed, key ${envValue} not found. Please check your .env file`);
        }
    });
};

export default {
    getTrelloApiKey: () => getEnvValue(envKeys.trelloApiKey),
    getAppToken: () => getEnvValue(envKeys.appToken),
};
