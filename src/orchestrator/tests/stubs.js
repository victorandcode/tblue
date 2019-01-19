export const questionGeneratedCards = [
    { "name": "Create dockerfile" },
    { "name": "Add google analytics" },
];

export const basicQuestionnaire = {
    "questions": [
        {
            "content": "Will you be using Docker?",
            "cardToGenerate": {
                "name": "Create Docker configuration"
            }
        },
        {
            "content": "Will you create mockups?",
            "cardToGenerate": {
                "name": "Create mockups"
            }
        },
        {
            "content": "Will you add google analytics?",
            "cardToGenerate": {
                "name": "Add google analytics"
            }
        }
    ],
    "cards": [
        {
            "name": "Repository configuration",
            "description": "- Create repo in "
        },
        {
            "name": "Configure react router",
            "description": ""
        },
        {
            "name": "Configure jest"
        },
        {
            "name": "Configure babel root import"
        },
        {
            "name": "Add pre push hooks"
        },
        {
            "name": "Define folder structure",
            "description": ""
        },
        {
            "name": "Configure dev environment",
            "description": ""
        },
        {
            "name": "Configure CI",
            "description": ""
        }
    ]
}
