import { create as createBoard } from "~/api/board";
import { create as createList } from "~/api/list";
import logger from "~/common/logger";

function main() {
  createBoard("My board with list")
    .then(response => {
      logger.success(
        `Board was created successufully an has an id of ${response.data.id}`
      );
      /*createList("To Do", response.data.id)
        .then(response => {
          logger.success("List was created");
        })
        .catch(error => logger.fail(`Error is: ${error}`));*/
    })
    .catch(error => logger.fail(`ERROR is: ${error}`));
}

main();
