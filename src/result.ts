import { T_result_mark } from './type';

export class Result implements T_result_mark {
  data: any;
  message!: string;

  constructor(public answer: any, public correctness: number, public marker: string) {}
}