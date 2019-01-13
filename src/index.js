import { create as createBoard } from "~/api/board";
import logger from "~/common/logger";

async function main() {
  try {
    const boardId = await createBoard("Created with async await");
    logger.success(
      `Board was created successufully an has an id of ${boardId}`
    );
  } catch (error) {
    logger.fail(`ERROR is: ${error}`);
  }
}

main();
