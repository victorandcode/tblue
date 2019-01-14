// @flow
import { create as createBoard, getLists } from "~/api/board";
import { create as createCard } from "~/api/card";
import logger from "~/common/logger";

async function main() {
  try {
    const board = await createBoard("Created with async await");
    const lists = await getLists(board.id);
    const firstListId = lists[0].id;
    const card = await createCard("My new card", firstListId);
    console.log("YEY card: ", card);
  } catch (error) {
    logger.fail(`ERROR is: ${error}`);
  }
}

main();
