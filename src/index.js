// @flow
import program from 'commander';

import { validateEnvironment } from '~/common/env';
import logger from '~/common/logger';
import { begin } from '~/orchestrator';
import { printAppInfo } from './branding';

const parseArguments = () =>
    program
        .option(
            '-c, --custom-blueprints-folder [customBlueprintsFolder]',
            'Custom blueprints folder'
        )
        .parse(process.argv);

async function main() {
    try {
        parseArguments();
        printAppInfo();
        await validateEnvironment();
        await begin(program.customBlueprintsFolder);
    } catch (error) {
        logger.fail(`${error.stack}`);
    }
}

main();
