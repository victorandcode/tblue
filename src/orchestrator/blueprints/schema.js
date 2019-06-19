// @flow
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required(),
    unitOfWork: yup.string().required(),
    questions: yup.array().of(yup.object().shape({
        content: yup.string().required(),
        cardToGenerate: yup.object().shape({
            name: yup.string().required(),
        }),
    })),
    cards: yup.array().of(yup.object().shape({
        name: yup.string().required(),
    })),
});

export const matchesBlueprintFormat = (candidateBlueprint: Object): boolean =>
    schema.isValidSync(candidateBlueprint);