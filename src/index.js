// @flow
import inquirer from "inquirer";

import { begin } from "~/orchestrator";
import logger from "~/common/logger";

function main() {
  try {
    begin();
  } catch (error) {
    logger.fail(`ERROR is: ${error}`);
  }
}

main();
