// @flow
import opn from 'opn';
import logger from './logger';

export const envKeys = {
    trelloApiKey: 'TRELLO_API_KEY',
    appToken: 'APP_TOKEN',
};

export const getEnvValue = (key: string) => process.env[key];
export const getTrelloApiKey = () => getEnvValue(envKeys.trelloApiKey);
export const getAppToken = () => getEnvValue(envKeys.appToken);

const keypress = async () => {
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', () => {
        process.stdin.setRawMode(false)
        resolve()
    }))
}

const appKeyUrl = 'https://trello.com/app-key';

const appTokenUrl = (apiKey: string) => `https://trello.com/1/authorize?key=${apiKey}&name=TmanScaffoldingForTrello&expiration=never&response_type=token&scope=read,write`;

export const alertAndOpenUrl = async (missingEnvKey: string, url: string) => {
    logger.instructions(
        `You don\'t have the environment variable ${missingEnvKey} set. Press any key to open the URL where you can grab the value for it.`
    );
    await keypress();
    opn(url);
    logger.instructions('Please grab the value from the web page and add it as an environment variable. Then, reload the terminal.');
    process.exit();
}

export const validateEnvironment = async () => {
    const apiKey = getTrelloApiKey();
    if(!apiKey) {
        await alertAndOpenUrl(envKeys.trelloApiKey, appKeyUrl);
    }

    const appToken = getAppToken();
    if(!appToken) {
        await alertAndOpenUrl(envKeys.appToken, appTokenUrl(apiKey));
    }
};
