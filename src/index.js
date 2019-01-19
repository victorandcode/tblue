// @flow
import logger from "~/common/logger";
import { begin } from "~/orchestrator";

async function main() {
  try {
    begin();
  } catch (error) {
    logger.fail(`ERROR is: ${error}`);
  }
}

main();
