// @flow
import type { Card, Blueprint } from '~/types';
export const questionGeneratedCards = [
    { 'name': 'Create dockerfile' },
    { 'name': 'Add google analytics' },
];

const generateBlueprint = (name: string, unitOfWork: string, questions, cardNames: Array<string>): Blueprint => {
    const cards: Array<Card> = cardNames.map(cardName => ({
        name: cardName,
    }));
    return {
        name,
        questions,
        cards,
        unitOfWork,
    };
};

export const basicBlueprint = generateBlueprint(
    'Frontend App',
    'feature',
    [
        {
            'content': 'Will you be using Docker?',
            'cardToGenerate': {
                'name': 'Create Docker configuration',
            },
        },
        {
            'content': 'Will you create mockups?',
            'cardToGenerate': {
                'name': 'Create mockups',
            },
        },
        {
            'content': 'Will you add google analytics?',
            'cardToGenerate': {
                'name': 'Add google analytics',
            },
        },
    ],
    [
        'Repository configuration',
        'Configure react router',
        'Configure jest',
        'Configure babel root import',
        'Add pre push hooks',
        'Define folder structure',
        'Configure dev environment',
        'Configure CI',
    ]
);

export const userRegisteredBlueprint = generateBlueprint(
    'My first blueprint',
    'feature',
    [
        {
            'content': 'Will you run this in Amazon S3?',
            'cardToGenerate': {
                'name': 'Deploy project to Amazon S3',
            },
        },
        {
            'content': 'Will you create a github landing page?',
            'cardToGenerate': {
                'name': 'Setup github landing page',
            },
        },
    ],
    [
        'Configure development environment',
        'Install jQuery',
        'Setup HTML5 boilerplate',
        'Configure CI',
    ]
);

// export const invalidBlueprints = {
//     blueprintNoName: {
//         questions: [
//             {
//                 'content': 'Will you run this in Amazon S3?',
//                 'cardToGenerate': {
//                     'name': 'Deploy project to Amazon S3',
//                 },
//             },
//         ],

//     },
//     blueprintNoQuestions: {
//         name: 'My first blueprint',

//     },
//     blueprintBadBlueprint: {
//         name: 'My first blueprint'
//         questions: [
//             {
//                 'content': 'Will you run this in Amazon S3?',
//             },
//         ],
//         [
//             'Configure development environment',
//             'Install jQuery',
//             'Setup HTML5 boilerplate',
//             'Configure CI',
//         ]
//     },
// };