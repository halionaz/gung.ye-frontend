export interface AnswerType {
  data: {
    [key: string]: number;
  };
  yourResponse?: {
    id?: string;
    answerVal?: string;
  };
  pointSum: number;
  totalNum: number;
}
