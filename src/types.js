export type Card = {
    name: string,
    description?: string,
};

export type Question = {
    content: string,
    cardToGenerate: Card,
};

export type Questionnaire = {
    cards: Array<Card>,
    name: string,
    questions: Array<Question>,
};