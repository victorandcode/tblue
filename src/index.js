import { create } from "~/api/board";
import logger from "~/common/logger";

function main() {
  create("Created from console yey")
    .then(response => logger.success("It was created successufully"))
    .catch(error => logger.fail(`ERROR is: ${error}`));
}

main();
