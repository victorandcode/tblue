// @flow
import inquirer from 'inquirer';

import logger from '~/common/logger';
import type { Blueprint } from '~/types';

const questionName = 'selectedBlueprint';

export const getBlueprintTitle = (blueprint: Blueprint) =>
    `${blueprint.name} (${blueprint.cards.length} built-in cards, ${blueprint.questions.length} questions)`;

export const solicitBlueprint = async (blueprints: Array<Blueprint>): Blueprint => {
    logger.instructions(
        'Blueprints contain pre-defined cards and also cards generated based on your answers');
    const answers = await inquirer
        .prompt([{
            type: 'list',
            name: questionName,
            message: 'What blueprint would you like to use?',
            choices: blueprints.map(blueprint => ({
                name: getBlueprintTitle(blueprint),
                value: blueprint.name,
            })),
            prefix: '📋',
        }]);
    return blueprints.find(q => q.name === answers[questionName]);
};
