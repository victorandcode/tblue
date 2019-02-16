// @flow
import program from 'commander';

import { validateEnvironment } from '~/common/env';
import logger from '~/common/logger';
import { printAppInfo } from './branding';
import { begin } from '~/orchestrator';

const parseArguments = () => {
    program
        .option('-c, --custom-blueprints-folder [customBlueprintsFolder]', 'Custom blueprints folder')
        .parse(process.argv);
    return program;
};

async function main() {
    try {
        const programArguments = parseArguments();
        printAppInfo();
        await validateEnvironment();
        await begin(programArguments.customBlueprintsFolder);
    } catch (error) {
        logger.fail(`${error.stack}`);
    }
}

main();
