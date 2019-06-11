export type Card = {
  name: string
};

export type Question = {
  content: string,
  cardToGenerate: Card
};

export type Blueprint = {
  cards: Array<Card>,
  name: string,
  unitOfWork: string,
  questions: Array<Question>
};
