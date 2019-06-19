// @flow
import program from 'commander';

import welcome from '~/branding/welcome';
import { validateEnvironment } from '~/common/env';
import logger from '~/common/logger';
import { begin } from '~/orchestrator';

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
        welcome();
        await validateEnvironment();
        await begin(program.customBlueprintsFolder);
    } catch (error) {
        logger.fail(`${error.stack}`);
    }
}

main();
