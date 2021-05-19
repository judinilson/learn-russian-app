
export enum AnswerType{
    BoolType = 1,
    InputType = 2
}
export class Answer{
    Id: Number;
    State: boolean;
    Answesrs: string;
}

export class Trainings{ 
    Id:number;
    Questions: string[];
    Answers: Answer[];
}

export class TrainingContent{
    Id:number;
    CategoryId: number;
    Title: string;
    Trainings: Trainings[];
    Author: string;
    AnswerTypes:AnswerType
     coverImage: string;
}