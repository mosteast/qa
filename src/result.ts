import { T_result } from './type';

export class Result implements T_result {
  data: any;
  message!: string;

  constructor(public answer: any, public correctness: number, public marker: string) {}
}