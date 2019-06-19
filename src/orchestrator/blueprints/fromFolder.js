// @flow
import fs from 'fs';
import path from 'path';

import logger from '~/common/logger';

export const blueprintExtension = '.blueprint.json';

const fileToJson = (fileName: string, fileFolder: string): Object => {
    const filePath = path.join(fileFolder, fileName);
    const contentsRaw = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return JSON.parse(contentsRaw);
};

export const getBlueprintsFromFolder = (folder: string) => {
    try {
        const files = fs.readdirSync(folder);
        const jsonFileNames = files.filter(file => file.endsWith(blueprintExtension));
        return jsonFileNames.map<Object>(
            // $FlowFixMe
            jsonFileName => fileToJson(jsonFileName, folder)
        );
    } catch (ex) {
        logger.warning(`Not able to read blueprints from ${folder}`);
    }
    return [];
};