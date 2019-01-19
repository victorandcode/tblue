export type Card = {
    name: string,
    description?: string,
};

export type Question = {
    content: string,
    cardToGenerate: Card,
};

export type Questionnaire = {
    questions: Array<Question>,
    cards: Array<Card>
};