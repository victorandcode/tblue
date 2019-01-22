// @flow
import { validateEnvironment } from '~/common/env';
import logger from '~/common/logger';
import { printAppInfo } from './branding';
import { begin } from '~/orchestrator';

async function main() {
    try {
        printAppInfo();
        validateEnvironment();
        await begin();
    } catch (error) {
        logger.fail(`ERROR: ${error}`);
    }
}

main();
