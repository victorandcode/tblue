// @flow
import inquirer from "inquirer";

import { begin } from "~/orchestrator";
import logger from "~/common/logger";

async function main() {
  try {
    const cards = await begin();
    console.log("cards: ", cards);
  } catch (error) {
    logger.fail(`ERROR is: ${error}`);
  }
}

main();
