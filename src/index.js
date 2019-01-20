// @flow
import { validateEnvironment } from "~/common/env";
import logger from "~/common/logger";
import { begin } from "~/orchestrator";

async function main() {
  try {
    validateEnvironment(); 
    begin();
  } catch (error) {
    logger.fail(`ERROR: ${error}`);
  }
}

main();
