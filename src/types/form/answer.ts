export type TAnswer = {
    question_id: number;
    value: string;
};

export type TAnswersPayload = {
    answers: TAnswer[];
};