
// @flow
import os from 'os';
import path from 'path';

import { getBlueprintsFromFolder } from './fromFolder';
import sampleBlueprints from './samples';
import { matchesBlueprintFormat } from './schema';
import { solicitBlueprint } from './prompt';

export const blueprintsHomeFolder = path.join(os.homedir(), '.blueprints');

export const getBlueprintList = (customBlueprintsPath: ?string) => {
    let blueprints = sampleBlueprints;
    if(customBlueprintsPath) {
        blueprints = [...getBlueprintsFromFolder(customBlueprintsPath), ...blueprints];
    }
    blueprints = [...getBlueprintsFromFolder(blueprintsHomeFolder), ...blueprints];
    return blueprints.filter(matchesBlueprintFormat);
};

export const gatherBlueprints = async (customBlueprintsPath: ?string) =>
    await solicitBlueprint(
        getBlueprintList(customBlueprintsPath),
    );
